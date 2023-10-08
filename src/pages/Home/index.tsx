import { ColumnDef } from "@tanstack/react-table";
import Table from "../../componet/Table";
import  data from "../../api/data.json";
import { ICountry } from '../../interface';
import "./index.css"

// Interface 

const Home=()=>{
    // Table Columns
    const columns:Array<ColumnDef<ICountry>>=[
        {
            accessorKey:"name",
            header:"Name",
        },
        {
            accessorKey:"dial_code",
            header:"Dial Code",
        },
        {
        accessorKey:"code",
        header:"code"
        }
    ]

    return (
        <div className="container">
        <Table name="Country" data={data} columns={columns}/>
        </div>
    )
}
export default Home