import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm() {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Git it a try'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 center form'>
                    <input className='f4 pa2 w-70 center' type='text'/>
                    <button className='w-30 f4 link ph3 pv2 dib white bg-light-purple grow pointer'>Detect!</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;