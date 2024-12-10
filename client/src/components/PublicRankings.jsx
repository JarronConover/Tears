import './Components.css'

function PublicRankings(props) {
    const { brackets } = props;

    function NavigatePublicBrackets() {
    
    };

    return (
        <>
            <div onClick={NavigatePublicBrackets} className='public-bracket-div'>
                <div className='public-bracket-header'>
                    Trending Brackets
                </div>
                <div className='public-bracket-content'>
                    <div className='first-ranking'>Dynamicly add public data</div>
                    <div className='ranking'>Dynamicly add public data</div>
                    <div className='ranking'>Dynamicly add public data</div>
                </div>
            </div>
        </>
    )
}

export default PublicRankings;
