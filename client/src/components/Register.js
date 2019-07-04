import React, { Component } from 'react';
import { Redirect } from 'react-router';



import trophy from '../assets/trophy.png';
import trophy2 from '../assets/tropyh2.png';




class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedResponse: '',
      redirect: false,
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      formValid: false,
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      userNameValid: false,
      passwordValid: false,
      confirmPasswordValid: false

    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  getResponse = async () => {
    const response = await fetch('/users/register');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  componentDidMount() {
    this.getResponse()
      .then(res => {
        const data = res;
        this.setState({ renderedResponse: data.title });
      })
  }


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value }, this.validate(name, value));


  }

  validate(name, value) {
    var firstNameValid = this.state.firstNameValid;
    var lastNameValid = this.state.lastNameValid;
    var emailValid = this.state.emailValid;
    var userNameValid = this.state.userNameValid;
    var passValid = this.state.passwordValid;
    var confirmPasswordValid = this.state.confirmPasswordValid;
    var formValid = this.state.formValid;

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    switch (name) {
      case 'email': emailValid = re.test(value);
        break;
      case 'password': passValid = this.validatePassword(value);
        break;
      case 'firstName': firstNameValid = value !== "";
        break;
      case 'lastName': lastNameValid = value !== "";
        break;
      case 'userName': userNameValid = value !== "";
        break;
      case 'confirmPassword': confirmPasswordValid = value === this.state.password;
        break;
    }

    if (emailValid && passValid && firstNameValid && lastNameValid && userNameValid && confirmPasswordValid) {
      formValid = true;
    } else {
      formValid = false;
    }


    this.setState({ emailValid: emailValid, passwordValid: passValid, firstNameValid: firstNameValid, lastNameValid: lastNameValid, userNameValid: userNameValid, confirmPasswordValid: confirmPasswordValid, formValid: formValid });


  }

  validatePassword(value) {
    if (
      value === this.state.confirmPassword) {
      this.setState({ confirmPasswordValid: true });
    } else {
      this.setState({ confirmPassword: '' });
    }




    return value.length >= 7

  }


  handleSubmit = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      userEmail: this.state.email,
      passWord: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      confirmPassword: this.state.confirmPassword
    });

    const headers = { 'content-type': 'application/json', accept: 'application/json' };

    await fetch('/users/register', { method: 'POST', headers, body })
      .then((res) => this.setState({ redirect: true }))
      .catch(function (response) {
        //this.setState({error:true, errmsg: error});
        //console.log(response.data)
      })

  }





  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/profile' />;
    }

    return (



      <div id="outside">

        <div id="left"><p id="pspace"></p><img src={trophy}></img></div>
        <div id="middle">

          <div className="formContainer" id="registerFormContainer">
            <div className="form-header registerFormHeader">Create New Account</div>
            <div className="form-body">

              <h6>Register Now for Douglasville Youth Tackle Football!</h6>
              <form id="registerForm" onSubmit={this.handleSubmit}>


                <h6>First Name</h6>
                <input className="form-input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" />
                {this.state.firstNameValid === false ? <h6>Required.</h6> : null}
                <div className="space"></div>

                <h6>Last Name</h6>
                <input className="form-input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" />
                {this.state.lastNameValid === false ? <h6>Required.</h6> : null}
                <div className="space"></div>

                <h6>Email</h6>
                <input className="form-input" type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                {this.state.emailValid === false ? <h6>Required. Must be correct form: '--@--.com'</h6> : null}
                <div className="space"></div>

                <h6>User Name</h6>
                <input className="form-input" type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="Username" />
                {this.state.userNameValid === false ? <h6>Required.</h6> : null}
                <div className="space"></div>

                <h6>Password</h6>
                <input className="form-input" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                {this.state.passwordValid === false ? <h6>Required. Must be 7 characters or longer.</h6> : null}
                <div className="space"></div>

                <h6>Confirm Password</h6>
                <input className="form-input" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Re-enter Password" />
                {this.state.confirmPasswordValid === false ? <h6>Passwords don't match.</h6> : null}
                <div className="space"></div>
                <div><h6>By clicking Create Account you agree
to the <br />Terms of Service,  Privacy Policy,  and License<br /> Agreement.</h6></div>
                <div className="space"></div>
                <button className="form-btn" type="submit" disabled={this.state.formValid === false}>
                  Create Account
         </button>
                <div className="space"></div>

              </form>
            </div>
            <div className="form-footer"></div>
          </div>



        </div>
        <div id="right"><img src={trophy2}></img></div>
        <div id="bottom"></div>
      </div>



    );
  }

}




export default Register;
