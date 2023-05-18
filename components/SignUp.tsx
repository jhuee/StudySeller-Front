import React, { useState, FormEvent } from "react";
import {
Button,
Form,
Grid,
Header,
Icon,
Message,
Segment,
Menu
} from "semantic-ui-react";


const Signup: React.FC = () => {
const [name, setName] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [confirmPassword, setConfirmPassword] = useState<string>("");

const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setName(event.target.value);
};

const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setEmail(event.target.value);
};

const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setPassword(event.target.value);
};

const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setConfirmPassword(event.target.value);
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
event.preventDefault();
console.log("Submitted form data:", { name, email, password, confirmPassword });
// 여기에 폼 데이터를 서버로 전송하는 로직을 추가
};

return (
<Segment>
<Menu style={{ backgroundColor: 'transparent' ,paddingTop : '5px'}} stackable inverted size='massive' fixed='top' >
<Menu.Item  style={{fontSize: '20px', color: 'grey'}}>
StudySeller
</Menu.Item>
</Menu>
<Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
<Grid.Column style={{ maxWidth: 450 }}>
<Header as="h2" color="teal" textAlign="center">
<Icon name="github" size="big" /> Create your account
</Header>
<Form size="large" onSubmit={handleSubmit}>
<Segment stacked>
<Form.Input
fluid
icon="user"
iconPosition="left"
placeholder="Name"
value={name}
onChange={handleNameChange}
/>
<Form.Input
fluid
icon="mail"
iconPosition="left"
placeholder="E-mail address"
value={email}
onChange={handleEmailChange}
/>
<Form.Input
fluid
icon="lock"
iconPosition="left"
placeholder="Password"
type="password"
value={password}
onChange={handlePasswordChange}
/>
<Form.Input
fluid
icon="lock"
iconPosition="left"
placeholder="Confirm password"
type="password"
value={confirmPassword}
onChange={handleConfirmPasswordChange}
/>
<Button color="teal" fluid size="large" type="submit">
Create Account
</Button>
</Segment>
</Form>
<p style={{ marginTop: "1.5rem" }}>
By clicking “Create account”, you agree to our Terms of Service and
Privacy Statement. We’ll occasionally send you account related emails.
</p>
<Message>
Already have an account? <a href="/login">Sign in</a>
</Message>
</Grid.Column>
</Grid>
</Segment>
);
};

export default Signup;