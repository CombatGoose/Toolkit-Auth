import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { logOut } from '../../redux/reducers/usersReducer';

const LogOut = () => {

    const [form, setForm] = useState({
        password: ''
    });

    const dispatch = useDispatch();

    const usersList = useSelector(state => state.users.list);

    const foundUser = usersList.find(user => user.login === localStorage.getItem('userLogin'));

    const handleUpdateForm = (formType, formName) => { 
        setForm({
          ...form,
          [formType]: formName
        });
    }

    const handleLogOut = () => {
        if (form.password !== foundUser.password) {
            alert('Uncorrect password!');
            return;
        }

        dispatch(logOut(foundUser.id, foundUser.password));
        localStorage.removeItem('userLogin');

        setForm({
            password: ''
        })
    }

    return (
        <>
            <h1>LogOut</h1>
            <form>
                <input type="text" placeholder='Enter your password' onChange={(e) => handleUpdateForm('password', e.target.value)}/>
                <button onClick={handleLogOut}>Send</button>
            </form>
        </>
    )
}

export default LogOut;