import React, { Component } from 'react'
import Style from 'styled-components'
import {
  Container,
  Col,
  Form,
  FormGroup as FrmGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Spinner
} from 'reactstrap'
import { connect } from 'react-redux'
import { userLogin } from '../redux/actions/AuthAction'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  componentWillMount() {
    if (this.props.auth.isLogin) {
      this.props.history.push('/')
    }
  }
  formSubmit = (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    this.props.userLogin(this.state.username, this.state.password, (res) => {
      if (res) {
        this.setState({ isLoading: false })
        this.props.history.push('/')
      }
    })
  }
  inputHandler = (e) => {
    this.setState({
      username: e.currentTarget.value
    })
  }
  passwordHandler = (e) => {
    this.setState({
      password: e.currentTarget.value
    })
  }

  render() {
    return (
      <div>
        <LoginPage>
          <LoginRow>
            <Container>
              <WrapperLogin sm="12" md={{ size: 4, offset: 4 }} className="mt-5">
                <h3 className="text-center header-auth mb-3">Sign In To Admin</h3>
                <Form>
                  <FormGroup className="px-3">
                    <Label for="exampleEmail" className="label-form-display">
                      Username
                    </Label>
                    <Input
                      disabled={this.state.isLoading ? true : false}
                      invalid={this.state.isWrong ? true : false}
                      required
                      value={this.state.username}
                      onChange={(e) => this.inputHandler(e)}
                    />
                  </FormGroup>
                  <FormGroup className="px-3 mt-3">
                    <Label for="examplePassword" className="label-form-display">
                      Password
                    </Label>
                    <Input
                      disabled={this.state.isLoading ? true : false}
                      invalid={this.state.isWrong ? true : false}
                      required
                      type="password"
                      value={this.state.password}
                      onChange={(e) => this.passwordHandler(e)}
                    />
                    <FormFeedback>Oh noes! Invalid username or password</FormFeedback>
                  </FormGroup>
                  <FormGroup className="px-3 mt-4 mb-5">
                    <Button
                      disabled={this.state.isLoading ? true : false}
                      onClick={(e) => this.formSubmit(e)}
                      className="px-4 py-2"
                      color="primary">
                      {this.state.isLoading ? <Spinner size="sm" color="white" /> : 'Sign In'}
                    </Button>
                  </FormGroup>
                </Form>
                <Span> Don't have an account yet ? Sign Up</Span>
              </WrapperLogin>
            </Container>
          </LoginRow>
        </LoginPage>
      </div>
    )
  }
}

const LoginPage = Style('body')`
background-color : 'red';
height : 100vh
`
const LoginRow = Style('div')`
display: flex;
justify-content: center;
align-items: center;

`
const FormGroup = Style(FrmGroup)`
margin-bottom: 0; 

`
const WrapperLogin = Style(Col)`
background-color : #fff;
box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
border: 1px solid #ebecec;
padding: 60px 35px;
border-radius: 5px;
`
const Span = Style('span')`
display: flex;
justify-content: center;
align-items: center;
`

const mapStateToProps = (state) => {
  return {
    auth: state.Auth
  }
}
export default connect(mapStateToProps, { userLogin })(Login)
