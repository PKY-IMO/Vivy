import React from 'react'
import { storiesOf } from '@storybook/react'

import Icon from './icon'

const defaultIcon = () => (
  <Icon icon='bars' theme='primary' />
)

const IconWithType = () => (
  <>
    <Icon icon='times' theme='danger' />
    <br/>
    <Icon icon='times' theme='info' />
    <br/>
    <Icon icon='times' theme='light' />
  </>
)

const IconWithSize = () => (
  <>
    <Icon icon='bars' theme='primary' size='lg' />
    <br/>
    <Icon icon='bars' theme='primary' size='sm' />
    <br/>
    <Icon icon='bars' theme='primary' size='3x' />
  </>
)

storiesOf('Icon Component', module)
  .add('默认 Icon', defaultIcon)
  .add('不同样式 Icon', IconWithType)
  .add('不同大小 Icon', IconWithSize)