import { useState } from 'react'
import Navbar from '../components/navbar';
import PublicRankings from '../components/PublicRankings';
import MyBrackets from '../components/MyBrackets';
import FillOutBrackets from '../components/FillOutBrackets';
import Footer from '../components/footer';

function HomePage() {
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
        <MyBrackets/>
        {/* 
            <CreateBrackets/>
       */}
        <FillOutBrackets/>
       </div>

      <Footer/>
    </>
  )
}

export default HomePage;
