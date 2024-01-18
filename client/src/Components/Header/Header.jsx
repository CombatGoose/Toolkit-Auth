import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <Link to='/register'>Register</Link>
            <Link to='/auth'>Auth</Link>
            <Link to='/logOut'>LogOut</Link>
            <Link to='/user'>{localStorage.getItem('userLogin')}</Link>
        </header>
    )
}

export default Header