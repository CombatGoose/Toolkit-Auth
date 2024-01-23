import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { register } from '../../redux/reducers/usersReducer';

const Register = () => {

    const [form, setForm] = useState({
        login: '',
        firstname: '',
        lastname: '',
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

      const handleUserRegister = () => {

        const foundUser = usersList.find(user => user.login === form.login);
        
        if (foundUser) {
          alert(`User ${foundUser.login} is already registered!`);
          return;
        };

        if (form.login.length < 1 || form.firstname.length < 1 || form.lastname.length < 1 || form.password.length < 1) {
          alert('Login and first and last names are required! Min password length is 8.');
          return;
        }

        dispatch(register(form.login, form.firstname, form.lastname, form.password));

        setForm({
            login: '',
            firstname: '',
            lastname: '',
            password: ''
        });

        alert('Successfully register! Now, authorize to your account');
      }

    return (
        <center>
            <h1>Register</h1>
            <input type="text" placeholder='Enter your login' onChange={e => handleUpdateForm('login', e.target.value)}/>
            <input type="text" placeholder='Enter your firstname' onChange={e => handleUpdateForm('firstname', e.target.value)}/>
            <input type="text" placeholder='Enter your lastname' onChange={e => handleUpdateForm('lastname', e.target.value)}/>
            <input type="password" placeholder='Enter your password' onChange={e => handleUpdateForm('password', e.target.value)}/>
            <button onClick={handleUserRegister}>Send</button>
        </center>
    );
}

export default Register;