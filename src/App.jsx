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


const Layout = () => {
  return (
    <div className='bg-[url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80)] bg-cover bg-center  '>
      <div className=' backdrop-blur-md bg-black/60 border border-gray-700 rounded-3xl  shadow-2xl '>
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
      </Route>
      <Route path='/Contactme' element={<Contactme />} />

    </Route>

  )))
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  )
}

export default App