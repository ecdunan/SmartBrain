import React from 'react';

function Navigation({isSignedIn, onChangeRoute}) {
    if(isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 link dim black underline pa3 pointer mt0'
                   onClick={() => onChangeRoute('signOut')}>
                Sign Out
                </p>
            </nav>
            );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 link dim black underline pa3 pointer mt0'
                   onClick={() => onChangeRoute('signIn')}>
                   Sign In
                   </p>
                <p className='f3 link dim black underline pa3 pointer mt0'
                  onClick={() => onChangeRoute('register')}>
                Register
                </p>
            </nav>
            );
    }
}

export default Navigation;