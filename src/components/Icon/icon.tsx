import React, { FC } from "react"
import classNames from "classnames"
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  /** 主题样式 */
  theme?: ThemeProps;
}

const Icon: FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  // 添加icon主题
  const classes = classNames('vivy-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps}/>
  )
}

Icon.displayName = 'Icon'
export default Icon;