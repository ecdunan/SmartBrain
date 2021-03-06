import React from 'react'
import Tilt from 'react-tilt'
import brain from './brain.png'

function Logo() {
    return (
            <div className='ma4 mt0'>
                <Tilt className="Tilt br3 shadow-5" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                    <div className="Tilt-inner pa2">
                        <img src={brain} alt='logo'/>
                    </div>
                </Tilt>
            </div>
        );
}

export default Logo;