import React, {useState} from 'react'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'  
import Button from './components/Button/button'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <Icon icon="arrow-down" theme='danger' size='10x'></Icon>
      <header className="App-header">
        <Button className="custom"> Hello </Button>
        <Button disabled> Disabled Button </Button>
        <Button btnType='primary' size='lg'> Large Primary </Button>
        <Button btnType='danger' size='sm'> Small Danger </Button>
        <Button btnType='link' href="http://www.baidu.com" target="_blank"> Baidu Link </Button>
        <Button btnType='link' href="http://www.baidu.com" disabled> Disabled Link </Button>
        <Menu defaultIndex={'0'} onSelect={(index) => {alert(index)}} mode="horizontal">
          <MenuItem>
            cool link 0
          </MenuItem>
          <MenuItem disabled>
            cool link 1
          </MenuItem>        
          <MenuItem>
            cool link 2
          </MenuItem>
          <SubMenu title='submenu'>
            <MenuItem>
              cool link 3-1
            </MenuItem>
            <MenuItem>
              cool link 3-2
            </MenuItem>
          </SubMenu>
        </Menu>
        <Button onClick={()=>{setShow(!show)}}>toggle</Button>
        <Transition 
          in={show}
          timeout={300}
          animation="zoom-in-top"
          wrapper
        >
           <p>
          Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button btnType='primary'>HI</Button>
        </Transition>

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
