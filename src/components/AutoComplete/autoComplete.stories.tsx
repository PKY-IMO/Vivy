import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'
interface fruitProps {
  value: string;
  price: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const SimpleComplete = () => {
  const lakers = ['Apple', 'Banana', 'Blackberry', 'Apricot', 'raspberry',
  'pear', 'watermelon', 'tomato', 'lemon', 'pineapple', 'haw', 'grape']

  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  }

  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入水果英文试试"
    />
  )

}

const customComplete = () => {
  const lakersWithNumber = [
    {value: 'Apple', price: 11},
    {value: 'Banana', price: 1},
    {value: 'Blackberry', price: 4},
    {value: 'Apricot', price: 2},
    {value: 'raspberry', price: 15},
    {value: 'pear', price: 23},
    {value: 'watermelon', price: 3},
    {value: 'tomato', price: 14},
    {value: 'lemon', price: 39},
    {value: 'haw', price: 0},
  ] 
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<fruitProps>
    return (
      <>
        <b>水果名称: {itemWithNumber.value}</b>
        <span>价格: {itemWithNumber.price}</span>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入水果英文试试"
      renderOption={renderOption}
    />
  )
}

const ajaxComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      placeholder="输入 Github 用户名试试"
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}


storiesOf('AutoComplete Component', module)
  .add('默认 AutoComplete', SimpleComplete)
  .add('自定义 AutoComplete', customComplete)
  .add('异步请求 AutoComplete', ajaxComplete)