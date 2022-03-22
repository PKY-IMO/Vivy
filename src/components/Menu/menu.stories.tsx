import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

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
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem> 
    <MenuItem>
      cool link 2
    </MenuItem> 
  </Menu>
)

const menuWithSubMenu = () => (
  <Menu {...testProps}>
    <MenuItem>
      menu1
    </MenuItem>
    <MenuItem>
      menu2
    </MenuItem>
    <MenuItem>
      menu3
    </MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>
        submenu1
      </MenuItem>
      <MenuItem>
        submenu2
      </MenuItem>
      <MenuItem>
        submenu3
      </MenuItem>
    </SubMenu>
  </Menu>
)

const menuWithVerSubMenu = () => (
  <Menu {...testVerProps}>
    <MenuItem>
      menu1
    </MenuItem>
    <MenuItem>
      menu2
    </MenuItem>
    <MenuItem>
      menu3
    </MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>
        submenu1
      </MenuItem>
      <MenuItem>
        submenu2
      </MenuItem>
      <MenuItem>
        submenu3
      </MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('默认 Menu', defaultMenu )
  .add('支持子菜单 SubMenu', menuWithSubMenu)
  .add('纵向菜单 VerticalMenu', menuWithVerSubMenu)