import React, { Component } from 'react';
import brain from '../Logo/brain.png';
import './SignIn.css';

 class SignIn extends Component {
    constructor(props) {
      super(props);

      this.state = {
        signInEmail: '',
        signInPassword: ''
      }
    }

    onEmailChange = event => {
      this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = event => {
      this.setState({signInPassword: event.target.value});
    }

    onSignInSubmit = event => {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body : JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      }).then(response => response.json())
        .then(user => {
          if(user.id) {
            this.props.loadUser(user);
            console.log(user);
            this.props.onSignIn('home');
          }
        })
    }

    onEnterPress = event => {
     if(event.key === 'Enter') {
      this.onSignInSubmit(event);
     }
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
                           type="email"
                           name="email-address"
                           id="email-address"
                           placeholder="Email"
                           onKeyPress = {this.onEnterPress}
                           onChange = {this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                          <input
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          onKeyPress = {this.onEnterPress}
                          onChange = {this.onPasswordChange}/>
                        </div>
                      </fieldset>
                      <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                            onClick={this.onSignInSubmit}
                            value="Sign in"/>
                      </div>
                    </div>
                  </main>
              </div>
          </article>
      );
    }
}

export default SignIn;