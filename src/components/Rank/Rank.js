import React from 'react';

function Rank(props) {
    return (
        <div>
            <div className='white f3'>
                {`Hi ${props.name}! You loaded a total of...`}
            </div>
            <div className='white f1'>
                {`${props.entries} images!`}
            </div>
        </div>
    );
}

export default Rank;