import React from 'react'
import DataTable from 'react-data-table-component'

export default function NewDataTable() {
const data = [
    {id: 1, name: "Shorif", number: "3435"},
    {id: 2, name: "Arif", number: "3445635"},
    {id: 3, name: "Rofukul", number: "343345"},
    {id: 4, name: "arpa", number: "3345435"},
    {id: 5, name: "arafat", number: "456763435"},
    {id: 6, name: "Anik", number: "367879435"},
    {id: 7, name: "Anika", number: "3232435"},
    {id: 8, name: "Papiya", number: "657435"},
    {id: 9, name: "Raza", number: "87945335"},
    {id: 10, name: "Badsha", number: "098723987"},
]

const columns = [
    {
        name: "Id",
        selector: (row) => row.id
    },
    {
        name: "Title",
        selector: (row) => row.name
    },
    {
        name: "Number",
        selector: (row) => row.number
    },
]

  return (
    <div>
        <DataTable
        title="Name List"
        columns={columns}
        data={data}
        pagination
        />
    </div>
  )
}
