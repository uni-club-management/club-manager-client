import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate} from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import ClubList from "./routes/admin/clubs/club-list";
import ClubEditAdminPage from "./routes/admin/clubs/club-edit";
import ClubDocumentsList from "./routes/admin/clubs/club-edit/documents";
import MeetingCalendar from "./routes/common/meeting/meeting-calendar";
import EventList from "./routes/admin/events/event-list";
import LoginPage from "./routes/login";
import React from "react";
import {AuthContext} from "./context/AuthContext.tsx";
import {AuthenticationResponseRolesEnum} from "./types";
import {useCookies} from "react-cookie";
import axios from "axios";
import {adminOptions, presidentOptions} from "./layouts/side-bar-options.ts";
import Members from './routes/president/members/index.tsx';
import Events from './routes/president/events/index.tsx';
import EventDetails from './routes/president/events/components/eventDetails.tsx';
import Budget from './routes/president/budget/index.tsx';
import ClubMembers from "./routes/president/members/index.tsx";
import ClubBudget from "./routes/president/budget/index.tsx";

function App() {


    const [cookies, setCookie] = useCookies(['token']);
    const intervalRef = React.useRef();

    const getToken = React.useCallback(() => {
            if (cookies.token) {
                axios.post("http://localhost:8080/api/v1/auth/refresh-token", {}, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(res => {
                    setCookie('token', res.data, {path: '/', maxAge: 86400})
                    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data?.refreshToken
                })
            }
        },
        [cookies.token, setCookie]
    );

    React.useEffect(() => {
        const interval = setInterval(() => getToken(), 24000);
        // eslint-disable-next-line
        // @ts-ignore
        intervalRef.current = interval;
        return () => clearInterval(interval);
    }, [getToken]);


    const {user} = React.useContext(AuthContext)


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/'>
                <Route path={"/login"} element={<LoginPage/>}/>
                {
                    user?.roles?.includes(AuthenticationResponseRolesEnum.ADMIN) ?
                        <Route path={'/admin'} element={<RootLayout options={adminOptions}/>}>
                            <Route path='clubs'>
                                <Route index element={<ClubList/>}/>
                                <Route path=':clubId' element={<ClubEditAdminPage/>}>
                                    <Route index element={<ClubBudget/>}/>
                                    <Route path={"budget"} element={<ClubBudget/>}/>
                                    <Route path={"members"} element={<ClubMembers/>}/>
                                    <Route path={"documents"} element={<ClubDocumentsList/>}/>
                                </Route>
                            </Route>

                            <Route path='events'>
                                <Route index element={<EventList/>}/>
                                <Route path=':eventId' element={<EventDetails/>}/>
                            </Route>
                            <Route path='meetings' element={<MeetingCalendar/>}/>
                        </Route>
                    :
                    user?.roles?.includes(AuthenticationResponseRolesEnum.PROF) ?
                        <Route path={"prof"} element={<div>Prof protected Page</div>}/>
                    :
                    user?.roles?.includes(AuthenticationResponseRolesEnum.PRESIDENT) ?
                        <Route path='/president' element={<RootLayout options={presidentOptions}/>}>
                            <Route path='dashboard' element={<div>dashboard</div>}/>
                            <Route path='members' element={<Members/>}/>
                            <Route path='events'>
                                <Route index element={<Events/>}/>
                                <Route path=':eventId' element={<EventDetails/>}/>
                            </Route>
                            <Route path='budget' element={<Budget/>}/>
                            <Route path='meetings' element={<MeetingCalendar/>}/>
                        </Route>
                    :
                    user?.roles?.includes(AuthenticationResponseRolesEnum.TREASURER) ?
                        <Route path={"treasurer"} element={<div>Treasurer protected Page</div>}/>
                    :
                    user?.roles?.includes(AuthenticationResponseRolesEnum.SECRETARY) ?
                        <Route path={"secretary"} element={<div>Secretary protected Page</div>}/>
                    :
                        <Route path={"*"} element={<Navigate to='/login' replace/>}/>
                }
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App
