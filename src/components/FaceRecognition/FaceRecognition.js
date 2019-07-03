import React from 'react';

function FaceRecognition({ image }) {
    return (
        <div className= 'center ma'>
            <div className='absolute ma2'>
                <img src={image} alt='pic' width='500px' height='auto'/>
            </div>
        </div>
    );
}

export default FaceRecognition;