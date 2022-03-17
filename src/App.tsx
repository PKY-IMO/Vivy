import React from 'react'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'  
import Button from './components/Button/button'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="custom"> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType='primary' size='lg'> Large Primary </Button>
        <Button btnType='danger' size='sm'> Small Danger </Button>
        <Button btnType='link' href="http://www.baidu.com" target="_blank"> Baidu Link </Button>
        <Button btnType='link' href="http://www.baidu.com" disabled> Disabled Link </Button>
        <Menu defaultIndex={0} onSelect={(index) => {alert(index)}} mode="horizontal">
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1} disabled>
            cool link 2
          </MenuItem>        
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
        </Menu>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
