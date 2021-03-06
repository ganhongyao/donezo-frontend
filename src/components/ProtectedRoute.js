import React from 'react';
import { Route, Redirect } from 'react-router-dom' 

export default function ProtectedRoute({component: Component, isLoggedIn, ...rest}) {
    return (
        <Route {...rest} render={props => isLoggedIn
            ? <Component {...props} {...rest}/>
            : <Redirect to={{pathname: '/login'}}/>
        }/>
    )
}