import React from "react";
import {Link} from "react-router-dom";
import Nav from "./Nav";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";

const NotFound = (props) => {
    if(!props.authedUser){
        return (<LoginPage></LoginPage>)
    }

    return(
        <div>
        <Nav></Nav>
        <h1>404- Not Found</h1>
        <Link className="gohomelink" to="/">Please Go to Login Page and Login to access the link</Link>
    </div>
    );
}

const mapStateToProps = ({authedUser}) => ({
    authedUser
  });
  
export default connect(mapStateToProps)(NotFound);
