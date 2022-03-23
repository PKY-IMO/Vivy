import React,{ FC, useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'


export interface SubMenuProps {
  /** 子菜单名称 */
  title: string;
  /** 索引 */
  index?: string;
  /** 自定义类 */
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
      const childEle =  child as FunctionComponentElement<MenuItemProps>
      if (childEle.type.displayName === 'MenuItem') {
        return React.cloneElement(childEle, {
          index: `${index}-${i}`
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu