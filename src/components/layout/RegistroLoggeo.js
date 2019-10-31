import React from 'react'
import {Link} from 'react-router-dom'

export function RegistroLoggeo() {
    return (
        <ul className="nav navbar-nav navbar-right">
        <li><Link className="singup" to={'/signup'}><span className="glyphicon glyphicon-user"></span> Registrame</Link></li>
        <li><Link className="singin" to={'/signin'}><span className="glyphicon glyphicon-log-in"></span> Loggeame</Link></li>
      </ul>
    )
}