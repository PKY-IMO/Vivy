import React, { FC, useState, createContext }  from "react"
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

export type MenuMode = 'vertical' | 'horizontal'
export type SelectCallback = (index: string) => void

export interface MenuProps {
  className?: string;
  defaultIndex?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[]; 
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[]; 
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, style, onSelect, defaultOpenSubMenus, children } = props
  // 选中的下标
  const [currentActive, setActive] = useState(defaultIndex)
  // 点击
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  // 传值给子菜单
  const passContext: IMenuContext = {
    // 点击的index
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    // 横向还是纵向
    mode,
    // 默认展开的子菜单列表
    defaultOpenSubMenus,
  }
  // 渲染MenuItem,自动添加index
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childEle = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childEle.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childEle, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem or SubMenu")
      }
    })
  }
  const classes = classNames('vivy-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  return (
    <ul className={classes} style={style}  data-testid="test-menu">
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
}

Menu.displayName = 'Menu'
export default Menu