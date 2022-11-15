import React from 'react'
import { Menu, Dropdown } from 'antd'
import { connect } from 'react-redux'
import styles from './style.module.scss'

import FlagEn from './flags/en.svg'
import FlagRu from './flags/ru.svg'
import FlagFr from './flags/fr.svg'
import FlagZh from './flags/zh.svg'

const mapStateToProps = ({ settings }) => ({
  locale: settings.locale,
})

const LanguageSwitcher = ({ dispatch, locale }) => {
  const mapFlags = {
    en: FlagEn,
    ru: FlagRu,
    fr: FlagFr,
    zh: FlagZh,
  }

  const changeLanguage = ({ key }) => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'locale',
        value: key,
      },
    })
  }

  const language = locale.substr(0, 2)

  const menu = (
    <Menu selectedKeys={[locale]} onClick={changeLanguage}>
      <Menu.Item key="en-US">
        <span className={styles.menuIcon}>
          <img src={mapFlags.en} alt="English" />
        </span>
        English
      </Menu.Item>
      <Menu.Item key="fr-FR">
        <span className={styles.menuIcon}>
          <img src={mapFlags.fr} alt="French" />
        </span>
        French
      </Menu.Item>
      <Menu.Item key="ru-RU">
        <span className={styles.menuIcon}>
          <img src={mapFlags.ru} alt="Русский" />
        </span>
        Русский
      </Menu.Item>
      <Menu.Item key="zh-CN">
        <span className={styles.menuIcon}>
          <img src={mapFlags.zh} alt="简体中文" />
        </span>
        简体中文
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <div className={styles.dropdown}>
        <div className={styles.flag}>
          <img src={mapFlags[language]} alt={language} />
          <span>{language}</span>
        </div>
      </div>
    </Dropdown>
  )
}

export default connect(mapStateToProps)(LanguageSwitcher)
