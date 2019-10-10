import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Body, Text, Title, Button, Card, CardItem, Form, Item, Input, Label  } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { register } from '../../actions/registerActions'
import { connect } from 'react-redux'

class Register extends Component {
  state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   reg = () => {
      this.props.onRegisterClick(this.state.email, this.state.password)
   }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Register</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Text>Bla bla bla</Text>
            </CardItem>
          </Card>
          <Form>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input onChangeText={this.handleEmail}/>
            </Item>
            <Item fixedLabel>
              <Label>Password</Label>
              <Input onChangeText={this.handlePassword}/>
            </Item>
          </Form>
          <Button dark block onPress= {this.reg} style= {{marginTop: 40}}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    onRegisterClick: (email, password) =>{
      dispatch(register(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
