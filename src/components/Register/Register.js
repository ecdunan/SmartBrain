import React from 'react';
import brain from '../Logo/brain.png';

function Register({onRegister}) {
    return (
        <article className="br ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center card shadow-3">
            <div>
                <main className="pa4 black-80">
                      <img src={brain} alt='' width='50px' height='50px'/>
                  <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                       <legend className="f4 fw6 ph0 mh0">SmartBrain</legend>
                      <div className="mt3">
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name" id="name" placeholder="Name"/>
                      </div>
                      <div className="mt3">
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder="Email"/>
                      </div>
                      <div className="mv3">
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder="Password"/>
                      </div>
                    </fieldset>
                    <div className="">
                      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                          onClick={() => onRegister('home')}
                          value="Register"/>
                    </div>
                  </div>
                </main>
            </div>
        </article>
    );
}

export default Register;