import { useEffect } from 'react'
import { connect } from 'react-redux'

// antd core & themes styles
import 'antd/lib/style/index.less'
import './@alxandria-core/css/vendors/antd/themes/default.less'
import './@alxandria-core/css/vendors/antd/themes/dark.less'

// third-party plugins styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'c3/c3.min.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// vb vendors styles
import './@alxandria-core/css/vendors/antd/style.scss'
import './@alxandria-core/css/vendors/bootstrap/style.scss'
import './@alxandria-core/css/vendors/perfect-scrollbar/style.scss'
import './@alxandria-core/css/vendors/nprogress/style.scss'
import './@alxandria-core/css/vendors/chartist/style.scss'
import './@alxandria-core/css/vendors/chartist-tooltip-plugin/style.scss'
import './@alxandria-core/css/vendors/jvectormap/style.scss'
import './@alxandria-core/css/vendors/react-sortable-tree/style.scss'
import './@alxandria-core/css/vendors/react-draft-wysiwyg/style.scss'

// vb styles
import './@alxandria-core/css/core.scss'
import './@alxandria-core/css/custom.scss'
import './@alxandria-core/css/measurements.scss'
import './@alxandria-core/css/colors.scss'
import './@alxandria-core/css/utils.scss'
import './@alxandria-core/css/layout.scss'
import './@alxandria-core/css/router.scss'

// vb extra styles
import './@alxandria-core/css/extra/clean.scss' // clean styles
import './@alxandria-core/css/extra/air.scss' // air styles

const mapStateToProps = ({ settings: { version, theme, primaryColor } }) => ({
  version,
  theme,
  primaryColor,
})

let isLoaded = false

const StylesLoader = ({ dispatch, children, version, theme, primaryColor }) => {
  // listen & set vb-version (pro, air, fluent, ...)
  useEffect(() => {
    document.querySelector('html').setAttribute('data-vb-version', version)
  }, [version])

  // listen & set vb-theme (dark, default, ...)
  useEffect(() => {
    document.querySelector('html').setAttribute('data-vb-theme', theme)
    dispatch({
      type: 'settings/SET_THEME',
      payload: {
        theme: 'dark',
      },
    })
    if (isLoaded) {
      dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: 'menuColor',
          value: theme === 'dark' ? 'dark' : 'white',
        },
      })
    }
    isLoaded = true
  }, [theme, dispatch])

  // listen & set primaryColor
  useEffect(() => {
    const styleElement = document.querySelector('#primaryColor')
    if (styleElement) {
      styleElement.remove()
    }
    const body = document.querySelector('body')
    const styleEl = document.createElement('style')
    const css = document.createTextNode(`:root { --vb-color-primary: ${primaryColor};}`)
    styleEl.setAttribute('id', 'primaryColor')
    styleEl.appendChild(css)
    body.appendChild(styleEl)
  }, [primaryColor])

  return children
}

export default connect(mapStateToProps)(StylesLoader)
