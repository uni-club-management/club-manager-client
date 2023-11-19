import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import {adminOptions} from "./layouts/side-bar-options.ts";
import ClubList from "./routes/admin/club-list";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout options={adminOptions}/>}>
                <Route path='dashboard' element={<ClubList/>}/>
                <Route path='users' element={<div>users</div>}/>
                <Route path='team' element={<div>team</div>}/>
                <Route path='products' element={<div>products</div>}/>
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App
