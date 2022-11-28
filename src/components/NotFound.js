import React from "react";
import {Link} from "react-router-dom";
import Nav from "./Nav";

const NotFound = () => {
    return(
        <div>
        <Nav></Nav>
        <h1>404- Not Found</h1>
        <Link className="gohomelink" to="/">Please Go to Login Page and Login to access the link</Link>
    </div>
    );
}

export default NotFound;