import React, { Component } from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.goToRegistration = this.goToRegistration.bind(this);
  }

  handleLoginSubmit(event) {
    const { email, password, password_confirmation } = this.state;

    axios.post("/sessions", {
      user: {
        email: email,
        password: password
      }
    },
    {withCredentials: true}).then(response => {
      if (response.data.status === "created") {
        this.props.handleSuccessfulAuth(response.data);
        this.setState({
          loginErrors: ""
        });
      }
    }).catch(error => {
      console.log("registration error", error);
      this.setState({
        loginErrors: error
      });
    });
  }

  handleLoginChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  getLoginForm() {
    document.getElementById("loginFormContainer").html(response.login_form);
    document.getElementById("userLoginForm").attr("onSubmit", this.handleLoginSubmit)
    document.getElementById("userEmail").attr("value", this.state.email).attr("onChange", this.handleLoginChange);
    document.getElementById("userPassword").attr("value", this.state.password).attr("onChange", this.handleLoginChange);
    document.getElementById("goToRegistration").attr("onClick", goToRegistration);
  }

  goToRegistration() {
    this.props.history.push("/sign_up");
  }

  render() {
    return (console.log("something"));
  }

}

export default Login
