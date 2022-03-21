import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from "react"
import classNames from "classnames"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Icon from '../Icon/icon'

export type InputSize = 'lg' | 'sm'

// 接口值重复Omit忽略接口的值
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {  disabled, size, icon, prepend, append, style, ...restProps } = props
  const classes = classNames('vivy-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  // 受控组件初始值时undefined时 赋其他值会报错
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className="vivy-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
         className="vivy-input-inner"
         disabled={disabled}
         {...restProps}
      />
      {append && <div className="vivy-input-group-append">{append}</div>}
    </div>
  )
}

export default Input