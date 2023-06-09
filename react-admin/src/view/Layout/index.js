import React, {useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";

function  Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location,'location')
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        console.log(isAuthenticated,'isAuthenticated')
        if (!isAuthenticated) {
        navigate('/login',{state: { from: location.pathname }})
        }
    })
    return (
        <div>
            <h1>Layout</h1>
            <Link to='/products'>products</Link>
            <Outlet/>
        </div>
    )
}

export default Layout
