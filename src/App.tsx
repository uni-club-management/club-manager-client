import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import {adminOptions, presidentOptions} from "./layouts/side-bar-options.ts";
import Members from './routes/president/members/index.tsx';
import Events from './routes/president/events/index.tsx';
import EventDetails from './routes/president/events/components/eventDetails.tsx';

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout options={presidentOptions}/>}>

                <Route path='dashboard' element={<div>dashboard</div>}/>
                <Route path='users' element={<div>users</div>}/>
                <Route path='team' element={<div>team</div>}/>
                <Route path='products' element={<div>products</div>}/>
                <Route path='president'>
                    <Route path='dashboard' element={<div>dashboard</div>} />
                    <Route path='members' element={<Members />} />
                    <Route path='events'  >
                        <Route index element={<Events />} />
                        <Route path=':eventId' element={<EventDetails/>} />
                    </Route>
                    <Route path='documents' element={<div>docus</div>} />
                    <Route path='budget' element={<div>budget</div>} />


                </Route>
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App
