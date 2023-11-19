import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import {adminOptions} from "./layouts/side-bar-options.ts";
import ClubList from "./routes/admin/club-list";
import ClubEditAdminPage from "./routes/admin/club-edit";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout options={adminOptions}/>}>
                <Route path='clubs'>
                    <Route index element={<ClubList/>}/>
                    <Route path=':clubId' element={<ClubEditAdminPage/>}/>
                </Route>

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
