import React from 'react'
import { storiesOf } from '@storybook/react'

import Progress from './progress'

const defaultProgress = () => {
  return (
    <Progress percent={60}></Progress>  )
}

const progressWithType = () => {
  return (
    <>
      <Progress percent={60} theme='danger'></Progress>
      <br/>
      <Progress percent={50} theme='info' ></Progress>
      <br/>
      <Progress percent={30} theme='dark' showText={false}></Progress>
    </>
  )
}

storiesOf('Progress Component', module)
  .add('默认 Progress', defaultProgress)
  .add('不同样式 Progress', progressWithType)