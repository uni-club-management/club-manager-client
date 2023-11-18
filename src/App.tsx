
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
