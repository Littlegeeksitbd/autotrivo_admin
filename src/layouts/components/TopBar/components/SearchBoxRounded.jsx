import Icon from '@/components/wrappers/Icon'
const SearchBoxRounded = () => {
  return (
    <div id="search-box-rounded" className="hidden xl:flex">
      <div className="input-icon-group">
        <Icon icon="search" className="input-icon text-lg text-(--topbar-item-color)" />
        <input type="search" id="topbar-search" className="form-input w-57.5 rounded-full! border-none! bg-(--topbar-item-color)/7! text-(--topbar-item-color)!" placeholder="Search for something..." />
      </div>
    </div>
  )
}
export default SearchBoxRounded
