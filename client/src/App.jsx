import './App.css'
import { useEffect, useState } from 'react';
import HomePage from './pages/home';

function App() {
  const [page, setPage] = useState('home');
  const [loading, setLoading] = useState(true);

  async function getPage() {
      setPage('home')
  }

  useEffect(() => {
      getPage();
  }, [])

  return (
    <>
    {page=='home' && <HomePage></HomePage>}
    {page=='personal' && <PersonalPage></PersonalPage>}
    {page=='public' && <PublicPage></PublicPage>}
    {page=='brackets' && <BracketsPage></BracketsPage>}
      
    </>
  )
}

export default App;
