import React from 'react'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import {
  createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider
} from 'react-router-dom'
import Footer from './Components/Footer'
import ReceptionMirorrCard from './Products/ReceptionMirorrCard'
import ShowersCard from './Products/ShowersCard '
import About from './Components/About'
import MirrorCard from './Products/MirrorCard'

const Layout = () => {
  return (
    <div className='bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] opacity-95bg-1.jpg)]'>
      <Navbar />
      <Outlet />
      <Footer />

    </div>
  )

}

const App = () => {
  const route = (createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />}></Route>
        <Route path='/MirrorReception' element={<ReceptionMirorrCard />}></Route>
        <Route path='/ShowersCard' element={<ShowersCard />}></Route>
        <Route path='/MirrorCard' element={<MirrorCard />}> </Route>

      </Route>
    </Route>
  )))
  return (
    <div>
        <RouterProvider router={route} />
    </div>
  )
}

export default App