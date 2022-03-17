import React, { FC, useContext  }  from "react"
import classNames from 'classnames'
import { MenuContext } from './menu'

interface MenuItemProps {
  className?: string;
  index: number;
  style?: React.CSSProperties;
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
    if (context.onSelect && !disabled) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem