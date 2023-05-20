import { useRouter } from "next/router";
import React, { useState } from "react";
import {
Button,
Form,
Grid,
Header,
Image,
Message,
Segment,
} from "semantic-ui-react";
import axios from "axios";
import SignUp from "./SignUp"
import MainPage from "./MainPage"
import { siteConfig } from '@/lib/site-config'

//로그인 구현 함수
//로그인을 하면 토큰을 얻고, 로그아웃을 하면 토큰을 제거한다. -> 우선순위x
//만약에, 로그인을 하지 않았다면 error가 발생해서, Login 페이지로 이동하고
//로그인을 하면, 개인 notion page id를 가져와서, mypage버튼을 누를 때 가져온 notionPageID를 주소창에 넣어준다.


const LoginForm: React.FC = () => {
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [signUpError, setSignUpError] = useState('');
const [signUpSuccess, setSignUpSuccess] = useState(false);

const router = useRouter();
const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setEmail(e.target.value);
};

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setPassword(e.target.value);
};


const signUp =()=>{
  router.push("/signup")
  return
    <>
    <SignUp></SignUp>
    </>
  
}

const onClickSubmit = (id, pw) => {
  console.log(id, pw)
  axios({
    method: 'POST',
    url: `http://localhost:8085/member/login`,
    data: {
    
      userId: id,
      userPw: pw,
    },
    headers: { 
      "Content-Type": "application/json",

    }
  }).then(function (response) {
    console.log("Heade With Authentication :" + response);
    console.log(response.data)
    console.log(response.status)
    console.log(response.statusText)
    console.log(response.headers)
    console.log(response.config)
  
    
    if(response.data === "로그인 성공"){ //로그인에 성공했다면~
      console.log(id)
      axios({
      
        method: 'get',
        params: {
          userId: id
        },
        url : 'http://localhost:8085/member/info'
      }).then(function (response) {
        console.log(response.data) //사용자의 노션id를 받아옴
        const getNotionId :string = response.data
        router.push('/')
        if(router.pathname == '/') {
         siteConfig({
          // the site's root Notion page (required)
          rootNotionPageId:'d2b4ea372f144b00b918231012c6c801',
        
          // if you want to restrict pages to a single notion workspace (optional)
          // (this should be a Notion ID; see the docs for how to extract this)
          rootNotionSpaceId: null,
        
          // basic site info (required)
          name: 'Juhee Notion',
          domain: 'nextjs-notion-starter-kit.transitivebullsh.it',
          author: 'Travis Fischer',
        
          // open graph metadata (optional)
          description: 'Example Next.js Notion Starter Kit Site',
        
          // social usernames (optional)
          twitter: 'transitive_bs',
          github: 'jhuee',
          linkedin: 'fisch2',
          // mastodon: '#', // optional mastodon profile URL, provides link verification
          // newsletter: '#', // optional newsletter URL
          youtube: 'channel/UC_mCwYnys6ghgtQ54vXQv-g', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`
        
          // default notion icon and cover images for site-wide consistency (optional)
          // page-specific values will override these site-wide defaults
          defaultPageIcon: null,
          defaultPageCover: null,
          defaultPageCoverPosition: 0.5,
        
          // whether or not to enable support for LQIP preview images (optional)
          isPreviewImageSupportEnabled: true,
        
          // whether or not redis is enabled for caching generated preview images (optional)
          // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
          // environment variables. see the readme for more info
          isRedisEnabled: false,
        
          // map of notion page IDs to URL paths (optional)
          // any pages defined here will override their default URL paths
          // example:
          //
          // pageUrlOverrides: {
          //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
          //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
          // }
          pageUrlOverrides: null,
        
          // whether to use the default notion navigation style or a custom one with links to
          // important pages
          navigationStyle: 'default'
          // navigationStyle: 'custom',
          // navigationLinks: [
          //   {
          //     title: 'About',
          //     pageId: 'f1199d37579b41cbabfc0b5174f4256a'
          //   },
          //   {
          //     title: 'Contact',
          //     pageId: '6a29ebcb935a4f0689fe661ab5f3b8d1'
          //   }
          // ]
        })
        }
      })

    } else {
      alert(response.data)
    }
    
  })
  .catch(function (error) {
    console.log("Error : " +error);
  });

}

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as="h1" textAlign="center">
          <Image src="/sslogos.png" style={{ width: "200px", height: "200px" }} href="/"/>
        </Header>
        <Form size="massive" >
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              size="large"
              value={email}
              onChange={handleEmailChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              size="large"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button colors="#FFFFF" fluid size="large" type="submit" onClick={() => onClickSubmit(email, password)}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a onClick={signUp}>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>

  );
};

export default LoginForm;