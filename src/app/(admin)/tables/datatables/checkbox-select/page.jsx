import PageBreadcrumb from '@/components/PageBreadcrumb'
import Example from './components/SelectTable'
export const metadata = {
  title: 'Checkbox Select Datatables',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Checkbox Select" subtitle="DataTables" />
      <div className="grid grid-cols-1 gap-base">
        <Example />
      </div>
    </>
  )
}
export default Page
