import PageBreadcrumb from '@/components/PageBreadcrumb'
import RowAdd from './components/RowAdd'
export const metadata = {
  title: 'Add Rows',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Add Rows" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <RowAdd />
      </div>
    </>
  )
}
export default Page
