import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import ContactPage from './Pages/ContactPage'
import SendMessagePage from "./Pages/SendMessagePage"
import Navbar from './Components/Navbar'
import ContactDetails from './Components/ContactDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contactspage' element={<ContactPage />} />
          <Route path='/contact/:id' element={<ContactDetails />} />

          <Route path='/sent-messages' element={<SendMessagePage />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
