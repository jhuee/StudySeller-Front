import React from 'react';
import { Image, List, Segment, Menu, Dropdown, Input, Button,Header, Card } from 'semantic-ui-react';
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
<Segment.Group style={{height:800}}>
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
      <Header as='h1' style={{marginTop: 100, paddingLeft :70}} >둘러보기🍀</Header>
      <Segment style={{marginRight:35 ,marginTop : 80, marginLeft: 35}} padded='very' size='big' center>
      {/* <List animated celled size='large'>
    <List.Item v>
      <Image size='mini' avatar src='http://localhost:3000/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F6bd65d9f-b9af-432b-b06e-da596b40a2e4%252FIMG_7646.jpeg%3Ftable%3Dblock%26id%3Da684bdd9-8f5c-4ba0-bb93-252569b64cdd%26cache%3Dv2&w=2048&q=75' />
      <List.Content style={{paddigTop:10}} >
        <List.Header>Juhee's Notion</List.Header>
        <List.Description>쮜의 코딩 일기입니당</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='배경핑크클로버.png' />
      <List.Content>
        <List.Header>HAMBA's Notion</List.Header>
        <List.Description>쮜쫄병 한비님의 노션이올시다.</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='에어팟햄.png' />
      <List.Content>
        <List.Header>A-Yeon</List.Header>
        인하공업전문대학 컴퓨터시스템과20
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='배경핑크클로버.png' />
      <List.Content>
        <List.Header>Jinu's Notion</List.Header>
        인하공업전문대학 컴퓨터시스템과19 #React
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='에어팟햄.png' />
      <List.Content>
        <List.Header>Minjuni's Notion</List.Header>
        인하공업전문대학 컴퓨터시스템과19 #BackEnd
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='에어팟햄.png' />
      <List.Content>
        <List.Header>하힘들다</List.Header>
        인하공업전문대학 컴퓨터시스템과19 #BackEnd
      </List.Content>
    </List.Item>
  </List> */}
      <Card.Group>
      <Card href='/a684bdd98f5c4ba0bb93252569b64cdd'>
    <Image src='http://localhost:3000/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F6bd65d9f-b9af-432b-b06e-da596b40a2e4%252FIMG_7646.jpeg%3Ftable%3Dblock%26id%3Da684bdd9-8f5c-4ba0-bb93-252569b64cdd%26cache%3Dv2&w=2048&q=75' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Juhee's Notion</Card.Header>
      <Card.Description>
        쮜의 코딩일기입니당
      </Card.Description>
      <Card.Meta>
        #React
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <a>
        Go 🌐
      </a>
    </Card.Content>
  </Card>
  <Card href='/d2b4ea372f144b00b918231012c6c801'>
    <Image  src='에어팟햄.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>HAMBA's Notion</Card.Header>
      <Card.Description>
        앙비의 코딩일기입니당
      </Card.Description>
      <Card.Meta>
        #React
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <a>
      Go 🌐
      </a>
    </Card.Content>

  </Card>
  <Card href='/d2b4ea372f144b00b918231012c6c801'>
    <Image  src='프사1.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>A-YEON</Card.Header>
      <Card.Description>
        인하공업전문대학 컴시과 20 
      </Card.Description>
      <Card.Meta>
        #React
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <a>
      Go 🌐
      </a>
      
    </Card.Content>
  </Card>

  <Card href='/d2b4ea372f144b00b918231012c6c801'>
    <Image  src='프사3.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Jinu</Card.Header>
      <Card.Description>
        인하공업전문대학 컴시과 19학번
      </Card.Description>
      <Card.Meta>
        #React
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <a>
      Go 🌐
      </a>
    </Card.Content>
  </Card>
  
  <Card href='/d2b4ea372f144b00b918231012c6c801'>
    <Image  src='프사4.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Minjuni</Card.Header>
      <Card.Description>
        인하공업전문대학 컴시과 19학번 #BackEnd
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        L
      </a>  
    </Card.Content>
  </Card>

  <Card href='/d2b4ea372f144b00b918231012c6c801'>
    <Image  src='프사5.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Eun-Sun</Card.Header>
      <Card.Description>
        인하공업전문대학 컴시과 20학번
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        Let'go
      </a>
    </Card.Content>
  </Card>
  
  <Card href='/d2b4ea372f144b00b918231012c6c801'>
    <Image  src='프사7.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Suno</Card.Header>
      <Card.Description>
        인하공업전문대학 컴시과 19학번 #React
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        Let'go
      </a>
    </Card.Content>
  </Card>
  <Card href='/d2b4ea372f144b00b918231012c6c801'>
    <Image  src='프사6.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Jinu</Card.Header>
      <Card.Description>
        인하공업전문대학 컴시과 19학번 #React
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        Let'go
      </a>
    </Card.Content>
  </Card>
      </Card.Group>
      </Segment>
    </Segment>
    </Segment.Group>

)
};

export default ListExampleCelled;