import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 vivy 组件库❀</h1>
        <p>💐vivy 基于React实现的简单组件库💐</p>
        <h3>🎉🎉🎉安装试试</h3>
        <code>
            npm install vivy --save
        </code>
        <h6>🔗Github: https://github.com/PKY-IMO/Vivy</h6>
      </>
    )
  }, { info : { disable: true }})