import './Components.css'
import TearsLogo from '../assets/TearsLogo.jfif'


function Navbar(props) {
    const { logout } = props;

    return (
        <>
        <div className='Navbar'>
            <div className='title-logo'>
            <img src={TearsLogo} alt="Tears Logo" className="tears-logo" />
            <span className='title'>TEARS</span>
            </div>
            <div>
                <button className='navbar-button' onClick={ logout }>Log Out</button>
            </div>
        </div>

        </>
    )
}

export default Navbar;
