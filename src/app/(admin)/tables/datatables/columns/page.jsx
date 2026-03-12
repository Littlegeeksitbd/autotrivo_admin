import PageBreadcrumb from '@/components/PageBreadcrumb'
import Example from './components/ColumnTable'
export const metadata = {
  title: 'Show & Hide Columns Datatables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Show & Hide Columns" subtitle="Datatables" />
      <div className="grid grid-cols-1 gap-base">
        <Example />
      </div>
    </>
  )
}
export default Page
