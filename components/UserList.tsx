import React from 'react';
import { Image, List, Segment, Menu, Dropdown, Input, Button } from 'semantic-ui-react';
import { PageSocial } from './PageSocial';
import * as config from '@/lib/config'
import * as types from '@/lib/types'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NotionPage } from './NotionPage';
import Login from './Login';

export const ListExampleCelled: React.FC<types.PageProps> = ({
    site, //site에 대한 것
    recordMap, //여러가지 깔리는 블록에 대한 것
    error,
    pageId, //
  }) => {

    const router = useRouter()

    if (router.pathname === "/"+pageId) {  
        console.log("B")
        return (
    <NotionPage></NotionPage>
        );
      } else if(router.pathname === "/login" &&  error) {
        console.log("A")
        return( <Login></Login>);
      } else if(router.pathname === '/list'){
        
      }

    //가져오는 로직
    const [list, setList] = useState([]);
    // useEffect(() =>{
    // try {
    //     axios({
    //         method: 'post',
    //         url: `http://localhost:8085/member`,
    //             data : {
    //                 user_sn : 2,
    //                 user_name:'김한비',
    //                 user_pw: 'juheelove',
    //                 user_id: '202045081'
    //         },
           
    //         headers: { 
    //           "Content-Type": "application/json",
          
    //         }
    //       }).then(function (response) {
    //         console.log("Heade With Authentication :" + response)
    //         console.log(response.data)
    //         console.log(response.status)
    //         console.log(response.statusText)
    //         console.log(response.headers)
    //         console.log(response.config)
    //       })
    //       .catch(function (error) {
    //         console.log("Error : " +error);
    //       });
    //   }
    // catch (err) {
    //   console.warn('error invalid social image url', pageId, err.message)
    // }});
  

    axios.get('http://localhost:8085')
    .then(response => {
        // 요청이 성공한 경우 처리
        console.log(response.data);
    })
    .catch(error => {
        // 요청이 실패한 경우 처리
        console.error(error);
    });
return (
<Segment.Group size='massive'>
<Segment>
      <Menu style={{ backgroundColor: 'transparent', paddingTop: '3px' }} stackable inverted size='massive' fixed='top'>
        <Menu.Item style={{ fontSize: '20px', color: 'grey' }}>StudySeller</Menu.Item>
        <Dropdown
          item
          text='Categories'
          style={{ fontSize: '20px', color: 'grey' }}
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
          onClick={() => router.push('/'+pageId)} //여기서 pageId값이 없으면 로그인 페이지로 넘어감
        />
        <Menu.Item
          style={{ fontSize: '20px', color: 'grey' }}
          to='/'
          name='mostPopular'
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
      <Segment style={{ marginTop : 200}}>
      <List celled>
    <List.Item>
      <Image avatar src='/images/avatar/small/helen.jpg' />
      <List.Content>
        <List.Header>Snickerdoodle</List.Header>
        An excellent companion
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='/images/avatar/small/daniel.jpg' />
      <List.Content>
        <List.Header>Poodle</List.Header>A poodle, it's pretty basic
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='/images/avatar/small/daniel.jpg' />
      <List.Content>
        <List.Header>Paulo</List.Header>
        He's also a dog
      </List.Content>
    </List.Item>
  </List>
      </Segment>
    </Segment>
    </Segment.Group>

)
};

export default ListExampleCelled;