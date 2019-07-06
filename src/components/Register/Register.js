import React, { Component } from 'react';
import brain from '../Logo/brain.png';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email : '',
      password: ''
    }
  }

  onNameChange = event => {
    this.setState({name: event.target.value});
  }

  onEmailChange = event => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value});
  }

  onEnterPress = event => {
    if(event.key === 'Enter') {
      this.onRegisterSubmit(event);
    }
  }

  onRegisterSubmit = event => {
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body : JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      }).then(response => response.json())
        .then(user => {
          if(user.id) {
            this.props.loadUser(user);
            this.props.onRegister('home');
          }
        });
  }

  render() {
    return (
        <article className="br ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center card shadow-3">
            <div>
                <main className="pa4 black-80">
                      <img src={brain} alt='' width='50px' height='50px'/>
                  <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                       <legend className="f4 fw6 ph0 mh0">SmartBrain</legend>
                      <div className="mt3">
                        <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onChange = {this.onNameChange}
                        onKeyPress = {this.onEnterPress}
                        />
                      </div>
                      <div className="mt3">
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        placeholder="Email"
                        onChange = {this.onEmailChange}
                        onKeyPress = {this.onEnterPress}/>
                      </div>
                      <div className="mv3">
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          onChange = {this.onPasswordChange}
                          onKeyPress = {this.onEnterPress}/>
                      </div>
                    </fieldset>
                    <div className="">
                      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                          onClick={this.onRegisterSubmit}
                          value="Register"/>
                    </div>
                  </div>
                </main>
            </div>
        </article>
    );
  }
}

export default Register;