import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.css'
import LoginPage from "./routes/login";


function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/'>
                <Route path={"login"} element={<LoginPage/>}/>
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App
