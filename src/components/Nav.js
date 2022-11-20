import {Link} from "react-router-dom";
import {connect} from "react-redux";

function Nav(props) {
    const {authedUser,currentUser}= props;
    const avatarimgurl = currentUser ? currentUser.avatarURL : "";

    return (<div>
        <nav className="nav">
            <ul>
                <li key="home">
                    <Link to="/home">Home</Link>
                </li>
                <li key="leaderboard">
                    <Link to="/leaderboard">LeaderBoard</Link>
                </li>
                <li key="add">
                     <Link to="/add">NewPoll</Link>
                </li>
                <li key="avatar">
                     <img alt="User Avatar" src={avatarimgurl} className="avataricon"/>
                </li>
                <li key="autheduser">
                    <label>{authedUser}</label>
                </li>
                <li key="logout">
                     <Link to="/">Logout</Link>
                </li>
            </ul>
        </nav>
    </div>)
}

const mapStateToProps = ({authedUser,users}) => ({
    authedUser,
    currentUser: users[authedUser]
})

export default connect(mapStateToProps)(Nav);