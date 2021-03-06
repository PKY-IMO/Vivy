import React, { FC, useState, createContext, FunctionComponentElement }  from "react"
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

export type MenuMode = 'vertical' | 'horizontal'
export type SelectCallback = (index: string) => void

export interface MenuProps {
  /** 自定义类 */
  className?: string;
  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  /** 菜单类型 横向或者纵向 */
  mode?: MenuMode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback;
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[]; 
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[]; 
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

export const Menu: FC<MenuProps> = (props) => {
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
      const childEle = child as FunctionComponentElement<MenuItemProps>
      if (childEle.type.displayName === 'MenuItem' || childEle.type.displayName === 'SubMenu') {
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
export default Menu;