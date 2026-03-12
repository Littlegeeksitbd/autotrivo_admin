'use client'

import { getSystemTheme, toggleAttribute } from '@/utils/layout'
import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'
const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
export const showBackdrop = () => {
  const htmlEl = document.documentElement
  const backdropEl = document.createElement('div')
  backdropEl.id = 'custom-backdrop'
  backdropEl.className = 'transition duration fixed inset-0 bg-default-900/50 z-40'
  document.body.appendChild(backdropEl)
  document.body.style.overflow = 'hidden'
  htmlEl.classList.add('sidenav-enable')
  if (window.innerWidth > 767) {
    document.body.style.paddingRight = '15px'
  }
  backdropEl.addEventListener('click', () => {
    hideBackdrop()
  })
}
export const hideBackdrop = () => {
  const htmlEl = document.documentElement
  htmlEl.classList.remove('sidenav-enable')
  const backdropEl = document.getElementById('custom-backdrop')
  if (backdropEl) {
    document.body.removeChild(backdropEl)
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}
const INIT_STATE = {
  skin: 'pixel',
  theme: 'light',
  orientation: 'vertical',
  sidenavSize: 'on-hover-active',
  sidenavColor: 'dark',
  sidenavUser: false,
  topbarColor: 'light',
  width: 'fluid',
  position: 'fixed',
  dir: 'ltr',
}
const LayoutContext = createContext(undefined)
export const useLayoutContext = () => {
  const context = use(LayoutContext)
  if (!context) {
    throw new Error('useLayoutContext can only be used within LayoutProvider')
  }
  return context
}
export const LayoutProvider = ({ children }) => {
  const [settings, setSettings] = useSessionStorage('__THEME_CONFIG__', INIT_STATE)
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const updateSettings = useCallback(
    (_newSettings) => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        ..._newSettings,
      }))
    },
    [setSettings]
  )
  const toggleCustomizer = useCallback(() => {
    setIsCustomizerOpen((prevValue) => !prevValue)
  }, [])
  const reset = useCallback(() => {
    setSettings(INIT_STATE)
  }, [setSettings])
  useEffect(() => {
    if (!settings.sidenavSize.includes('hover')) hideBackdrop()
    toggleAttribute('data-layout', settings.orientation)
    toggleAttribute('data-sidenav-user', settings.sidenavUser.toString())
    toggleAttribute('data-layout-position', settings.position)
    toggleAttribute('data-topbar-color', settings.topbarColor)
    toggleAttribute('data-menu-color', settings.sidenavColor)
    toggleAttribute('data-theme', settings.theme === 'system' ? getSystemTheme() : settings.theme)
    toggleAttribute('data-skin', settings.skin)
    toggleAttribute('data-sidenav-size', settings.sidenavSize)
    toggleAttribute('data-layout-width', settings.width)
    toggleAttribute('dir', settings.dir)
  }, [settings])
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (settings.orientation === 'vertical') {
        if (width <= 768) {
          updateSettings({
            sidenavSize: 'offcanvas',
          })
        } else if (width <= 1140 && settings.sidenavSize !== 'offcanvas') {
          updateSettings({
            sidenavSize: settings.sidenavSize === 'on-hover-active' ? 'condensed' : 'condensed',
          })
        } else {
          updateSettings({
            sidenavSize: settings.sidenavSize,
          })
        }
      } else if (settings.orientation === 'horizontal') {
        if (width < 992) {
          updateSettings({
            sidenavSize: 'offcanvas',
          })
        } else {
          updateSettings({
            sidenavSize: 'default',
          })
        }
      }
    }
    handleResize()
    const debouncedResize = debounce(handleResize, 200)
    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
    }
  }, [settings.orientation, settings.sidenavSize, updateSettings])
  return (
    <LayoutContext
      value={useMemo(
        () => ({
          ...settings,
          updateSettings,
          isCustomizerOpen,
          toggleCustomizer,
          reset,
        }),
        [settings, updateSettings, isCustomizerOpen, toggleCustomizer, reset]
      )}
    >
      {children}
    </LayoutContext>
  )
}
