import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './Components/Header/Header';
import Register from './Components/Register/Register';
import Auth from './Components/Auth/Auth';
import LogOut from './Components/LogOut/LogOut';
import User from './Components/User/User';

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/logOut' element={<LogOut/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='/user' element={<User/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;