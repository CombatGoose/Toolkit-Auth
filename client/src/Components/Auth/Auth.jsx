import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { auth } from '../../redux/reducers/usersReducer';

const Auth = () => {

    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    const dispatch = useDispatch();

    const usersList = useSelector(state => state.users.list);

    const handleUpdateForm = (formType, formName) => { 
        setForm({
          ...form,
          [formType]: formName
        });
      }

      const handleUserAuth = () => {
        const foundUser = usersList.find(user => user.login === form.login);

        if (!foundUser) {
            alert(`User ${form.login} is not defined. Please, check accurate of your login or create a new account`);
            return;
        }

        if (foundUser.password === form.password) {
            dispatch(auth(foundUser.login, foundUser.password));

            localStorage.setItem('userLogin', foundUser.login);

            setForm({
                login: '',
                password: ''
            });

            alert('Succesfully autorizated');

            window.location.reload();
        } else alert('Password is incorrect!');
      }

    return (
        <center>
        <h1>Auth</h1>
        <input type="text" placeholder='Enter your login' onChange={(e) => handleUpdateForm('login', e.target.value)}/>
        <input type="password" placeholder='Enter your password' onChange={(e) => handleUpdateForm('password', e.target.value)}/>
        <button onClick={handleUserAuth}>Send</button>
    </center>
    )
}

export default Auth;