import PageBreadcrumb from '@/components/PageBreadcrumb'
import EmailSidebar from '../components/EmailSidebar'
import EmailDetail from './components/EmailDetail'
export const metadata = {
  title: 'Email Details',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Email Details" subtitle="Apps" />

      <div className="flex flex-col lg:flex-row lg:gap-1.5 min-h-screen">
        <EmailSidebar className="lg:w-56.5 w-full" />
        <EmailDetail />
      </div>
    </>
  )
}
export default Page
