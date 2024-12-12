import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from "react-router-dom"

import HomePage from './pages/HomePage';
import PersonalPage from './pages/PersonalPage';
import PublicPage from './pages/PublicPage';
import BracketsPage from './pages/BracketsPage';
import CreatePage from './pages/CreatePage';
import FillBracketPage from './pages/FillBracketPage.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/personal",
        element: <PersonalPage/>
      },
      {
        path: "/public",
        element: <PublicPage/>
      },
      {
        path: "/brackets",
        element: <BracketsPage/>
      },
      {
        path: "/create",
        element: <CreatePage/>
      },
      {
        path: "/bracket/:id",
        element: <FillBracketPage/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />

)
