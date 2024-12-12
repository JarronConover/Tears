import './Pages.css'
import PageNavbar from "../components/PageNavbar";
import { Link } from 'react-router-dom';

function PersonalPage(props) {
    const { } = props;

    return (
        <>
            <PageNavbar title='My Brackets' button={
                <Link to="/" className="navbar-button">Home</Link>
            }
            />
            <div className="bracket">
                <span>title</span>
                <span>winner</span>
                <span>date made</span>
            </div>
        </>
    )
}

export default PersonalPage;