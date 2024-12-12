import './Components.css'
import TearsLogo from '../assets/TearsLogo.jfif'


function PageNavbar(props) {
    const { title, button } = props;

    return (
        <>
        <div className='Navbar'>
            <img src={TearsLogo} alt="Tears Logo" className="tears-logo" />
            <span className='title'>{ title }</span>
            <div>
                { button }
            </div>
        </div>

        </>
    )
}

export default PageNavbar;
