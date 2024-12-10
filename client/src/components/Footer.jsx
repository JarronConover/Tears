import './Components.css'
import JAWLogo from '../assets/JAWLogo.jpeg'
import { useEffect, useState } from 'react';

function Footer() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        const res = await fetch('/me/', {
            credentials: "same-origin",
        });
        const body = await res.json();
        setUser(body.user);
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
        <div className='Footer'>
        {loading ? (
            <div>Loading...</div>
        ) : (
            <>
            <div>Hello, {user && user.first_name}!</div>
            <img src={JAWLogo} alt="JAW Logo" className="logo-image" />
            <span className='logo'>JAW</span>
            <span>all rights reserved</span>
            </>
        )}
        </div>
        </>
    )
}

export default Footer;
