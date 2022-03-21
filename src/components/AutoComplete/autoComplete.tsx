import React, { FC, useState, useEffect, useRef, ChangeEvent, KeyboardEvent, ReactElement } from "react"
import classNames from "classnames"
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

export interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 自动联想的函数 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 用户选中时触发的事件 */
  onSelect?: (item: DataSourceType) => void;
  /** 用于支持自定义模板 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption,   ...restProps } = props
  // 输入值
  const [ inputValue, setInputValue ] = useState(value as string)
  // 联想值
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  // loading
  const [ loading, setLoading ] = useState(false)
  // showDropdown
  const [ showDropdown, setShowDropdown] = useState(false)
  // 防抖值 inputVlue 升级为 debouncedValue
  const debouncedValue = useDebounce(inputValue, 300)
  // 设置键盘事件
  const [ highlightIndex, setHighlightIndex ] = useState(-1)
  // 设置触发搜索的flag (解决选中联想后，改变inputvalue再次触发联想的bug)
  const triggerSearch = useRef(false)
  // 设置点击外部自动清空suggestions
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => {
    setSuggestions([])
    setShowDropdown(false)
  })
  // input 组件改变时 改变输入框的内容, （利用hooks改变联想框的内容）
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  // 利用hooks改变联想框的内容
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        } 
      }
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
    // 重置高亮index
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])
  // 用户选中联想后的操作
  const hanleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  // 键盘事件
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.key) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          hanleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }
  // 支持自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  // 渲染联想
  const renderDropDown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSuggestions([])}}
      >
        <ul className="vivy-suggestion-list">
            { loading &&
              <div className="suggstions-loading-icon">
                <Icon icon="spinner" spin/>
              </div>
            }
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => hanleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }


  return (
    <div className="vivy-auto-complete" ref={componentRef}>
      <Input 
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      { (suggestions.length > 0) && renderDropDown()}
    </div>
  )
}

export default AutoComplete;