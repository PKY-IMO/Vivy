import React, { FC, useState, createContext  }  from "react"
import classNames from 'classnames'

export type MenuMode = 'vertical' | 'horizontal'
export type SelectCallback = (index: number) => void

interface MenuProps {
  className?: string;
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;  
}

export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, style, onSelect, children } = props
  // 选中的下标
  const [currentActive, setActive] = useState(defaultIndex)
  // 点击
  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  // 传值给子菜单
  const passContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  const classes = classNames('vivy-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu