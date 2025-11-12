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
import Contactme from './Components/Contactme'
import ScrollToTop from './Components/ScrollToTop'


const Layout = () => {
  return (
    <div className='bg-black/70'>

      <div className='   '>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
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
        <Route path='/Contactme' element={<Contactme />} />

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