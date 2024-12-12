import React from 'react';
import './Components.css';

function DynamicPublicRankings(props) {
    const { } = props;

    return (
        <>
            <div className='public-bracket-div'>
                <div className='public-bracket-header'>
                    Trending Brackets
                </div>
                <div className='public-bracket-content'>
                    <div className='first-ranking'>Dynamically add public data</div>
                    <div className='ranking'>Dynamically add public data</div>
                    <div className='ranking'>Dynamically add public data</div>
                </div>
            </div>
        </>
    );
}

export default DynamicPublicRankings;
