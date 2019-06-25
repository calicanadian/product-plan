import React, { Component } from 'react';
import axios from 'axios';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    }

    this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
    this.handleRegistrationChange = this.handleRegistrationChange.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
  }

  handleRegistrationSubmit(event) {
    alert("handleRegistrations");
    const { email, password, password_confirmation } = this.state;

    axios.post("/registrations", {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    },
    {withCredentials: true}).then(response => {
      if (response.data.status === "created") {
        this.props.handleSuccessfulAuth(response.data);
        this.setState({
          registrationErrors: ""
        });
        window.location.replace('/');
      }
    }).catch(error => {
      console.log("registration error", error);
      this.setState({
        registrationErrors: error
      });
    });
    event.preventDefault();
  }

  handleRegistrationChange(event) {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  getLoginForm() {
    document.getElementById("userRegistrationForm").attr("onSubmit", this.handleRegistrationSubmit)
    document.getElementById("userEmail").attr("value", this.state.email).attr("onChange", this.handleRegistrationChange);
    document.getElementById("userPassword").attr("value", this.state.password).attr("onChange", this.handleRegistrationChange);
    document.getElementById("userPasswordConfirmation").attr("value", this.state.password_confirmation).attr("onChange", this.handleRegistrationChange);
    document.getElementById("gotoLogin").attr("onClick", gotoLogin());
  }

  goToLogin() {
    this.props.history.push("/login");
  }

  render() {
    return (
      console.log("registrations")
    )
  }
}

export default Registration
