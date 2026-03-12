import AppLogo from '@/components/AppLogo'
import useScrollEvent from '@/hooks/useScrollEvent'
import clsx from 'clsx'
import Link from 'next/link'
import AppsDropdownGrid from './components/AppsDropdownGrid'
import CustomizerToggler from './components/CustomizerToggler'
import FullscreenToggler from './components/FullscreenToggler'
import LanguageSelectorRounded from './components/LanguageSelectorRounded'
import MegamenuApps from './components/MegamenuApps'
import MegamenuColumns from './components/MegamenuColumns'
import MenuToggler from './components/MenuToggler'
import MonochromeToggler from './components/MonochromeToggler'
import NotificationDropdownPeople from './components/NotificationDropdownPeople'
import SearchBoxRounded from './components/SearchBoxRounded'
import ThemeDropdown from './components/ThemeDropdown'
import UserDropdownDetailed from './components/UserDropdownDetailed'
const TopBar = () => {
  const { scrollY } = useScrollEvent()
  return (
    <header
      className={clsx('app-header', {
        'topbar-active': scrollY > 50,
      })}
    >
      <div className="container-fluid flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="logo-box min-h-topbar-height sticky top-0 flex items-center justify-start backdrop-blur-xs">
            {/*<AppLogo />*/}
          </Link>

          <MenuToggler />

          {/*<SearchBoxRounded />*/}

          {/*<MegamenuColumns />*/}

          {/*<MegamenuApps />*/}
        </div>
        <div className="flex items-center gap-3">
          {/*<LanguageSelectorRounded />*/}

          {/*<AppsDropdownGrid />*/}

          <NotificationDropdownPeople />

          {/*<ThemeDropdown />*/}

          <FullscreenToggler />

          {/*<CustomizerToggler />*/}

          {/*<MonochromeToggler />*/}

          <UserDropdownDetailed />
        </div>
      </div>
    </header>
  )
}
export default TopBar
