import { useState } from 'react'
import Navbar from '../components/navbar';
import PublicRankings from '../components/PublicRankings';
import CreateBrackets from '../components/CreateBrackets';
import MyBrackets from '../components/MyBrackets';
import FillOutBrackets from '../components/FillOutBrackets';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

function HomePage(props) {
  const { navigateTo } = props

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
        <Navbar logout={logout}/>

       <div className='public-block'>
        <PublicRankings/>
       </div>
       <div className='personal-block'>
       {/* <Link to={'/personal'}>
          <MyBrackets navigateTo={navigateTo}/>
       </Link> */}
        
        <Link to={'/create'} className='no-underline'>
          <CreateBrackets navigateTo={navigateTo}/>
        </Link>
      
        <Link to={'/brackets'} className='no-underline'>
          <FillOutBrackets navigateTo={navigateTo} />
        </Link>
       </div>

      <Footer/>
    </>
  )
}

export default HomePage;
