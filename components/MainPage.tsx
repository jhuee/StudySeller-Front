import React, { useState } from 'react';
import { Image, Menu, Input, Segment, Grid, Header, Icon, List, Button, Dropdown } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import {NotionPage} from './NotionPage'
import { Footer } from './Footer'
import Login from './Login';
import ListPage from './UserList'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import * as types from '@/lib/types'

const App: React.FC <types.PageProps> = ({
  pageId, //로그인 했냐 안 했냐에 따라 pageId값이 나뉨
  error //로그인 안 했다면 에러, 했으면 에러 없음 (에러가 뜬다는 것은 개인 페이지를 불러오지 못 하거나, 다른 페이지를 뜻 함)
}) => { 
  const [activeItem, setActiveItem] = useState('');
  const router = useRouter()
  console.log(pageId)

  console.log(router.pathname)
  if (router.pathname === "/"+pageId) {  
    console.log("B")
    return (
<NotionPage></NotionPage>
    );
  } else if(router.pathname === "/login" &&  error) {
    console.log("A")
    return( <Login></Login>);
  } else if(router.pathname === '/list'){
    <ListPage></ListPage>
  }
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, { name }: { name: string }) =>
    setActiveItem(name);
  return (
    <Segment style={{ padding: 0 }}>
      <Menu style={{ backgroundColor: 'transparent', paddingTop: '3px' }} stackable inverted size='massive' fixed='top'>
        <Menu.Item style={{ fontSize: '20px', color: 'grey' }}>StudySeller</Menu.Item>
        <Dropdown
          item
          text='Categories'
          style={{ fontSize: '20px', color: 'grey' }}
          active={activeItem === 'mostComments'}
          onClick={handleItemClick}
        >
          <Dropdown.Menu>
            <Dropdown.Header>Elementary School</Dropdown.Header>
            <Dropdown.Item>Small</Dropdown.Item>
            <Dropdown.Item>Medium</Dropdown.Item>
            <Dropdown.Item>Large</Dropdown.Item>
            <Dropdown.Header>Middle School</Dropdown.Header>
            <Dropdown.Item>Small</Dropdown.Item>
            <Dropdown.Item>Medium</Dropdown.Item>
            <Dropdown.Item>Large</Dropdown.Item>
            <Dropdown.Header>High School</Dropdown.Header>
            <Dropdown.Item>Small</Dropdown.Item>
            <Dropdown.Item>Medium</Dropdown.Item>
            <Dropdown.Item>Large</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          style={{ fontSize: '20px', color: 'grey' }}
          
          name='MyPage'
          active={activeItem === 'notionpage'}
          onClick={() => router.push('/'+pageId)} //여기서 pageId값이 없으면 로그인 페이지로 넘어감
        />
        <Menu.Item
          style={{ fontSize: '20px', color: 'grey' }}
          to='/'
          name='mostPopular'
          active={activeItem === 'mostPopular'}
          onClick={() => router.push('/list')}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input class="ui transparent icon input" icon='search' placeholder='Search...' size='large' transparent />
          </Menu.Item>
          <Menu.Item style={{ fontSize: '20px', color: 'grey' }} name='login'  onClick={() => router.push('/login')}> 
            Sign In
          </Menu.Item>
          <Menu.Item href='/signup'>
            <Button class="ui grey basic button">Sign Up!</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Image src='mainPage.png' href='/' style={{ width: 'auto', height: 'auto', paddingRight: -10 }} />
    </Segment>
  );
};

export default App;
