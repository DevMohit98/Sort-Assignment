import { ColumnDef } from "@tanstack/react-table";
import Table from "../../componet/Table";
import  data from "../../api/data.json";
import "./index.css"

// Interface 
interface ICountry{
    name:string,
    dail_code:string,
    code:string
}

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