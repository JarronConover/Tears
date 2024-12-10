import './Components.css'

function FillOutBrackets(props) {
    const { brackets } = props;

    function NavigateFillOutBrackets() {
    
    };

    return (
        <>
            <div onClick={NavigateFillOutBrackets} className='my-bracket-div'>
                <div className='my-bracket-header'>
                    Fill Out Brackets
                </div>
                <div className='my-bracket-content'>
                    Dynamically add brackets here
                </div>
            </div>
        </>
    )
}

export default FillOutBrackets;
