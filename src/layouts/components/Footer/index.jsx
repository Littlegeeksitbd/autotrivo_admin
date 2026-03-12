import { currentYear, META_DATA } from '@/config/constants'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid flex w-full justify-center gap-base">
        <div>
          ©&nbsp;
          {currentYear} {META_DATA.name} by&nbsp;
          <span className="font-semibold">{META_DATA.author}</span>
        </div>
      </div>
    </footer>
  )
}
export default Footer
