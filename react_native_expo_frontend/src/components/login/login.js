import { SecureStore } from 'expo';
import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Body, Text, Title, Button, Card, CardItem, Form, Item, Input, Label  } from 'native-base';
import { View, ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { login } from '../../actions/logActions'
import { connect } from 'react-redux'
import store from '../../store/store'
import AppConfig from '../../../config.js'

const styles = {
  bgstyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  contentStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 40, 
    paddingHorizontal: 10
  },
  buttonStyle: {
    backgroundColor: AppConfig.Colors.ButtonColor, 
    marginTop: 60
  },
  formStyle: {
    marginTop: 20
  }
};

class Login extends Component {
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
  login = () => {
    this.props.onLoginClick(this.state.email, this.state.password)
  }

  componentDidMount() {
    if (this.props.token != null) {
      SecureStore.setItemAsync("Token", this.props.token);
      Actions.Home();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token != null) {
      SecureStore.setItemAsync("Token", this.props.token);
      Actions.Home();
    }
  }

  renderText() {
    if (this.props.loading) {
      return <Text>Loading</Text>
    }
    return <Text>Login</Text>
  }

  render() {
    return (
      <Container>
        <ImageBackground source={require("../../../assets/images/background.png")} style={styles.bgstyle}>
          <Content padder>
            <Form style={styles.formStyle}>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={this.handleEmail}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry = {true}  onChangeText={this.handlePassword}/>
              </Item>
            </Form>
            <Button dark block disabled={this.props.loading} onPress= {this.login} style= {styles.buttonStyle}>
              { this.renderText() }
            </Button>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    loading: state.loginReducer.loading,
    token: state.loginReducer.token
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    onLoginClick: (email, password) =>{
      dispatch(login(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
