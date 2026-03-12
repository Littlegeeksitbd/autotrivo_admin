'use client'

import DT from 'datatables.net-bs5'
import DataTable from 'datatables.net-react'
import 'datatables.net-responsive'
import 'datatables.net-select'
import { useEffect, useRef } from 'react'
import { paginationIcons, tableData } from '../../data'
const columns = [
  {
    data: null,
    orderable: false,
    className: 'text-start',
    render: DT.render.select(),
  },
  {
    data: 'company',
  },
  {
    data: 'symbol',
  },
  {
    data: 'price',
    render: (data) => `${data}`,
    className: 'text-start',
  },
  {
    data: 'change',
    render: (data) => `${data}%`,
    className: 'text-start',
  },
  {
    data: 'volume',
    className: 'text-start',
  },
  {
    data: 'marketCap',
    render: (data) => `${data}`,
  },
  {
    data: 'rating',
    render: (data) => `${data}★`,
  },
  {
    data: 'status',
    render: (data) => {
      const badgeClass = data === 'Bullish' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
      return `<span class="badge badge-label ${badgeClass}">${data}</span>`
    },
  },
]
const Table = () => {
  DataTable.use(DT)
  const tableRef = useRef(null)
  useEffect(() => {
    const dt = tableRef.current?.dt()
    if (!dt) return
    dt.on('select deselect', () => {
      const total = dt
        .rows({
          search: 'applied',
        })
        .count()
      const selected = dt
        .rows({
          selected: true,
          search: 'applied',
        })
        .count()
      const headerCheckbox = dt.table().header().querySelector('thead input[type="checkbox"]')
      if (headerCheckbox) {
        headerCheckbox.checked = total > 0 && total === selected
      }
    })
  }, [])
  return (
    <DataTable
      ref={tableRef}
      data={tableData.body}
      columns={columns}
      options={{
        select: {
          style: 'multi',
          items: 'row',
          selector: 'td',
          headerCheckbox: 'select-all',
          className: 'selected',
        },
        order: [[1, 'asc']],
        language: {
          paginate: paginationIcons,
        },
      }}
      className="table table-striped dt-responsive table align-middle"
    >
      <thead className="thead-sm text-2xs uppercase">
        <tr>
          <th className="fs-sm"></th>
          <th>Company</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change</th>
          <th>Volume</th>
          <th>Market Cap</th>
          <th>Rating</th>
          <th>Status</th>
        </tr>
      </thead>
    </DataTable>
  )
}
export default Table
