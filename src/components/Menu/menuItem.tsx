import React, { FC, useContext  }  from "react"
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  /** 自定义类 */
  className?: string;
  /** 索引 */
  index?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否禁用 */
  disabled?: boolean;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { className, index, style, disabled, children } = props
  // 接受传值
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem