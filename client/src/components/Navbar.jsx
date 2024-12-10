import './Components.css'
import TearsLogo from '../assets/TearsLogo.jfif'


function Navbar(props) {
    const { logout } = props;

    return (
        <>
        <div className='Navbar'>
            <img src={TearsLogo} alt="Tears Logo" className="tears-logo" />
            <span className='title'>TEARS</span>
            <div>
                <button className='logout' onClick={ logout }>Log Out</button>
            </div>
        </div>

        </>
    )
}

export default Navbar;
