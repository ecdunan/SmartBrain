import React from 'react';
import './FaceRecognition.css'

function FaceRecognition({ image, boxes }) {
    return (
        <div className= 'center ma'>
            <div className='absolute ma2'>
                <img id='inputImage' src={image} alt='' width='500px' height='auto'/>
                {
                    boxes.map((box,index) => {
                        return (
                                <div className ='bounding_box'
                                    style={{
                                        top: box.topRow,
                                        right: box.rightCol,
                                        bottom: box.bottomRow,
                                        left: box.leftCol
                                    }}
                                    key = {index} >
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}

export default FaceRecognition;