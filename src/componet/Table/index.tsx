import { Fragment, useState ,useEffect } from "react";
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import EmptyTableState from "./EmptyTableState";
import {useLocation ,useNavigate} from "react-router-dom"
import { parseSortingParams } from '../../utils';
interface TableProps {
  name: string;
  data: any[];
  columns: Array<ColumnDef<any>>;
}
const Table = ({ name, data, columns }: TableProps) => {
  //** for binding the sorting in url */
  const location= useLocation();
  const navigate=useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const sortingParams = searchParams.get("sort");
  //** soting state */
  const [sorting, setSorting] = useState<SortingState>(() => 
  parseSortingParams(sortingParams));
//** to handle the url binding sorting */
  useEffect(() => {
    if (sorting.length > 0) {
      const sortingParams = sorting
        .map((rule) => `${rule.id}:${rule.desc ? "desc" : "asc"}`)
        .join(",");
      searchParams.set("sort", sortingParams);
    } else {
      searchParams.delete("sort");
    }
    const newUrl = `?${searchParams.toString()}`;
    if (location.search !== newUrl) {
      navigate(newUrl);
    }
  }, [sorting, searchParams, navigate ,location]);

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getSortedRowModel:getSortedRowModel(),
    state:{
      sorting:sorting,
    },
    onSortingChange:setSorting,
  });
  return (
    <Paper elevation={0}>
      <TableContainer sx={{ maxHeight: 680 }}>
        <MuiTable size="small" stickyHeader={true}>
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} 
                  onClick={
                    header.column.getToggleSortingHandler()
                  }>
                    <span>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() ? (header.column.getIsSorted() ? " ↓" : " ↑") : ""}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyTableState name={name} />
                </TableCell>
              </TableRow>
            ) : (
              <Fragment>
                {getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </Fragment>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
};
export default Table;