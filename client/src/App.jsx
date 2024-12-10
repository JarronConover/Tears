import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  const [count, setCount] = useState(0)

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
      <div>
        <Navbar logout={logout}/>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App;
