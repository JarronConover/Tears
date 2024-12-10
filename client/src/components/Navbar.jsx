import './Components.css'


function Navbar(props) {
    const { logout } = props;

    return (
        <>
        <div className='Navbar'>
            <span></span>
            <span className='title'>TEARS</span>
            <button className='logout' onClick={ logout }>Log Out</button>
        </div>

        </>
    )
}

export default Navbar;
