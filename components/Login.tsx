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
      axios({
        method: 'get',
        url : 'http://localhost:8085/member/info'
      }).then(function (response) {
        console.log(response.data) //사용자의 노션id를 받아옴
        router.push('/')
        if(router.pathname == '/') {
          
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