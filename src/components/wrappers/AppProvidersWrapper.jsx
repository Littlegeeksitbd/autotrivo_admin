'use client'

import { LayoutProvider } from '@/context/useLayoutContext'
import { preline } from '@/utils/preline'
const AppProvidersWrapper = ({ children }) => {
  preline.init()
  return <LayoutProvider>{children}</LayoutProvider>
}
export default AppProvidersWrapper
