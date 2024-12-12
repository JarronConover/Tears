import React, { useEffect, useState } from 'react';
import './Components.css';

function PublicRankings() {
    const [brackets, setBrackets] = useState([]);

    useEffect(() => {
        const fetchBrackets = async () => {
            try {
                const response = await fetch('/brackets/'); // Replace with the correct endpoint
                if (response.ok) {
                    const data = await response.json();
                    setBrackets(data);
                } else {
                    console.error('Failed to fetch brackets');
                }
            } catch (error) {
                console.error('Error fetching brackets:', error);
            }
        };

        fetchBrackets();
    }, []);

    return (
        <div className='public-bracket-div'>
            <div className='public-bracket-header'>
                Trending Brackets
            </div>
            <div className='public-bracket-content'>
                {brackets.length > 0 ? (
                    brackets.map((bracket) => (
                        <div className='ranking' key={bracket.id}>
                            <div>Bracket Name: {bracket.name}</div>
                            <div>Winner: {bracket.winner || 'TBD'}</div>
                        </div>
                    ))
                ) : (
                    <div className='ranking'>No brackets available</div>
                )}
            </div>
        </div>
    );
}

export default PublicRankings;
