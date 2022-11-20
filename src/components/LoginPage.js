import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { connect } from 'react-redux';
import { setAuthedUser } from "../actions/authedUser";

function LoginPage(props) {

    useEffect((props) => {
        props.dispatch(handleInitialData());
      }, []);

    const {users} = props;  
    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const handleChange = (e) => {
        if(e.target.value && e.target.value !== ""){
            setUserName(e.target.value);
        }
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const userNameNotEmpty = userName!==null && userName !== "";
        const userObj = users[userName];

        if(userNameNotEmpty && userObj){
            props.dispatch(setAuthedUser(userName));
            setPassword("");
            setUserName("");
    
            if(userNameNotEmpty){
                const currentURL = window.location.pathname;
                if(currentURL === '/'){
                   navigate("/home")
                }
               
            }
        }
   } 

    return (<div>
        <h3>Employee Polls</h3>
        <img className="center" height="270px" alt="Employee Polls Icon" width="150px" src="https://www.nojitter.com/sites/default/files/Collab_AdobeStock_302523366_92221.jpeg"></img>
        <h4>Log In</h4>
        <form onSubmit={handleSubmit}>
            <div className="text-center">
                <label>User</label><br/>
                <select name="selectList" id="selectList" onChange={(e) => handleChange(e)}>
                    <option value=""></option>
                    {Object.keys(users).map((userId) => (
                        <option value={userId}>{users[userId].name}</option>
                    ))}
                </select>               
                <br/><br/>
                <label>Password</label><br/>
                <input value={password} type="text" id="password" name="password" onChange={handlePasswordChange}/><br/><br/>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>)
}

const mapStateToProps = ({authedUser,users}) => ({
    loading: authedUser === null,
    authedUser,
    users,
  });
  
export default connect(mapStateToProps)(LoginPage);
  