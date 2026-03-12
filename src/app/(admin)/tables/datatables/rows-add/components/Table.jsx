import DT from 'datatables.net-bs5'
import DataTable from 'datatables.net-react'
import 'datatables.net-responsive'
import { useRef } from 'react'
import { columns, paginationIcons, tableData } from '../../data'
const Table = () => {
  DataTable.use(DT)
  const tableRef = useRef(null)
  // Create a function that returns a DOM element
  const renderTopStart = () => {
    const container = document.createElement('div')
    container.className = 'd-flex'
    const button = document.createElement('button')
    button.className = 'btn bg-primary text-white btn-sm hover:bg-primary-hover'
    button.textContent = 'Add Row'
    button.onclick = () => tableRef.current?.dt()?.row.add(tableData.body[0]).draw(false)
    container.appendChild(button)
    return container
  }
  return (
    <>
      <DataTable
        ref={tableRef}
        data={tableData.body.slice(0, 5)}
        columns={columns}
        options={{
          // @ts-expect-error incorrect type definiton from lib
          responsive: true,
          lengthChange: false,
          layout: {
            topStart: renderTopStart,
          },
          language: {
            paginate: paginationIcons,
          },
        }}
        className="table-striped dt-responsive table align-middle"
      >
        <thead className="thead-sm text-2xs uppercase">
          <tr>
            {tableData.header.map((label, idx) => (
              <th key={idx}>{label}</th>
            ))}
          </tr>
        </thead>
      </DataTable>
    </>
  )
}
export default Table
