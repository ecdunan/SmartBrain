import React from 'react';

function Rank(props) {
    return (
        <div>
            <div className='white f3'>
                {`Hi ${props.name}! You total image count is...`}
            </div>
            <div className='white f1'>
                {props.entries}
            </div>
        </div>
    );
}

export default Rank;