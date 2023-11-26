import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import {adminOptions} from "./layouts/side-bar-options.ts";
import ClubList from "./routes/admin/clubs/club-list";
import ClubEditAdminPage from "./routes/admin/clubs/club-edit";
import ClubDocumentsList from "./routes/admin/clubs/club-edit/documents";
import MeetingCalendar from "./routes/common/meeting/meeting-calendar";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout options={adminOptions}/>}>
                <Route path='clubs'>
                    <Route index element={<ClubList/>}/>
                    <Route path=':clubId' element={<ClubEditAdminPage/>}>
                        <Route index element={<div>budget</div>}/>
                        <Route path={"budget"} element={<div>budget</div>}/>
                        <Route path={"members"} element={<div>members</div>}/>
                        <Route path={"documents"} element={<ClubDocumentsList/>}/>
                    </Route>
                </Route>

                <Route path='events' element={<div>envents</div>}/>
                <Route path='meetings'>
                    <Route index element={<MeetingCalendar/>}/>
                </Route>
                <Route path='products' element={<div>products</div>}/>
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App
