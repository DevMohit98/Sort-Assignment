import { Fragment } from "react";
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
} from "@tanstack/react-table";
import EmptyTableState from "./EmptyTableState";
interface TableProps {
  name: string;
  data: any[];
  columns: Array<ColumnDef<any>>;
}
const Table = ({ name, data, columns }: TableProps) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <Paper elevation={0}>
      <TableContainer sx={{ maxHeight: 680 }}>
        <MuiTable size="small" stickyHeader={true}>
          <TableHead>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    <span>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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