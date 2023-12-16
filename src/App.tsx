import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import {adminOptions, presidentOptions} from "./layouts/side-bar-options.ts";
import Members from './routes/president/members/index.tsx';
import Events from './routes/president/events/index.tsx';
import EventDetails from './routes/president/events/components/eventDetails.tsx';
import Budget from './routes/president/budget/index.tsx';

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout options={presidentOptions}/>}>
                <Route path='/president' element={<RootLayout options={presidentOptions}/>}>
                    <Route path='dashboard' element={<div>dashboard</div>} />
                    <Route path='members' element={<Members />} />
                    <Route path='events'  >
                        <Route index element={<Events />} />
                        <Route path=':eventId' element={<EventDetails/>} />
                    </Route>
                    <Route path='budget' element={<Budget />} />
                </Route>
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App
