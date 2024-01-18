import { useSelector } from 'react-redux';


const User = () => {
    const usersList = useSelector(state => state.users.list);
    const foundUser = usersList.find(user => user.login === localStorage.getItem('userLogin'));

    return (
        <center>
            <h1>{localStorage.getItem('userLogin')}</h1>
            <p>Firstname:{foundUser.firstname}</p>
            <p>Lastname:{foundUser.lastname}</p>
        </center>
    )
}

export default User