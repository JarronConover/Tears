import './Components.css'

function MyBrackets(props) {
    const { brackets } = props;

    function NavigateMyBrackets() {
    
    };

    return (
        <>
            <div onClick={NavigateMyBrackets} className='my-bracket-div'>
                <div className='my-bracket-header'>
                    My Brackets
                </div>
                <div className='my-bracket-content'>
                    Dynamically add brackets here
                </div>
            </div>
        </>
    )
}

export default MyBrackets;
