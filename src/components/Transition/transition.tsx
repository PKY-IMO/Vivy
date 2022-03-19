import React, { FC } from "react"
import { CSSTransition } from "react-transition-group"
import { CSSTransitionProps } from "react-transition-group/CSSTransition"

export type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom'

export type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  // 包裹 不与内置样式冲突
  wrapper?: boolean
}

const Transition: FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props
  return (
    <CSSTransition
      classNames={ classNames ? classNames : animation }
      {...restProps}
    >
      {wrapper ? <div className="wrapper-transition">{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  // 卸载时添加display：none属性
  unmountOnExit: true,
  // 默认打开时也能运行动画效果
  appear: true
}

export default Transition