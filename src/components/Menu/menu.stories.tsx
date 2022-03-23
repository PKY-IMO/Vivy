import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { MenuProps } from './menu'
import Menu from './index'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: action('Select!'),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: action('Select!'),
  defaultOpenSubMenus: ['4']
}

const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={action('Select!')} >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item> 
    <Menu.Item>
      cool link 2
    </Menu.Item> 
  </Menu>
)

const menuWithSubMenu = () => (
  <Menu {...testProps}>
    <Menu.Item>
      menu1
    </Menu.Item>
    <Menu.Item>
      menu2
    </Menu.Item>
    <Menu.Item>
      menu3
    </Menu.Item>
    <Menu.SubMenu title="dropdown">
      <Menu.Item>
        submenu1
      </Menu.Item>
      <Menu.Item>
        submenu2
      </Menu.Item>
      <Menu.Item>
        submenu3
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
)

const menuWithVerSubMenu = () => (
  <Menu {...testVerProps}>
    <Menu.Item>
      menu1
    </Menu.Item>
    <Menu.Item>
      menu2
    </Menu.Item>
    <Menu.Item>
      menu3
    </Menu.Item>
    <Menu.SubMenu title="dropdown">
      <Menu.Item>
        submenu1
      </Menu.Item>
      <Menu.Item>
        submenu2
      </Menu.Item>
      <Menu.Item>
        submenu3
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('默认 Menu', defaultMenu )
  .add('支持子菜单 SubMenu', menuWithSubMenu)
  .add('纵向菜单 VerticalMenu', menuWithVerSubMenu)