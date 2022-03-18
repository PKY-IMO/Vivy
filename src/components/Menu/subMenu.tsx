import React,{ FC, useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  // 设置子菜单是否展开
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') && openedSubMenus ? openedSubMenus.includes(index) : false
  // 控制子菜单的展开
  const [menuOpen, setOpen] = useState(isOpend)
  // 添加样式
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300);
  }
  // 垂直时，点击展开
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  // 水平时，hover展开
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
  } : {}
  // 渲染MenuItem,自动添加index
  const renderChildren = () => {
    const subMenuClasses = classNames('vivy-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childEle =  child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childEle.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childEle, {
          index: `${index}-${i}`
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu