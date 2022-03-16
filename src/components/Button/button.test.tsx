import React from "react"
import { render, fireEvent, screen } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'test',
  onClick: jest.fn()
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

const linkProps: ButtonProps = {
  btnType: 'link',
  href: 'https://www.baidu.com',
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    // 渲染
    const view = render(<Button {...defaultProps}>Test</Button>)
    // 获取 指定类型
    const ele = screen.getByText('Test') as HTMLButtonElement
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('BUTTON')
    fireEvent.click(ele)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the disabled default button', () => {
    // 渲染
    const view = render(<Button {...disabledProps}>Test</Button>)
    // 获取 指定类型
    const ele = screen.getByText('Test') as HTMLButtonElement
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('BUTTON')
    fireEvent.click(ele)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
  it('should render the testprops button', () => {
    // 渲染
    const view = render(<Button {...testProps}>Test</Button>)
    // 获取 指定类型
    const ele = screen.getByText('Test') as HTMLButtonElement
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('BUTTON')
    fireEvent.click(ele)
    expect(testProps.onClick).toHaveBeenCalled()
    expect(ele).toHaveClass('btn-primary btn-lg test')
  })
  it('should render the linktype button', () => {
    // 渲染
    const view = render(<Button {...linkProps}>Test</Button>)
    // 获取 指定类型
    const ele = screen.getByText('Test') as HTMLButtonElement
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('A')
    fireEvent.click(ele)
    expect(linkProps.onClick).toHaveBeenCalled()
    expect(ele).toHaveClass('btn-link btn')
  })
})
