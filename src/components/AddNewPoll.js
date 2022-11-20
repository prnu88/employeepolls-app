import {useState} from "react";
import Nav from "./Nav";
import {connect} from "react-redux";
import { useNavigate } from "react-router";
import { handleAddQuestion } from "../actions/questions";

function AddNewPoll({authedUser,dispatch}){
    const navigate = useNavigate();
    const [firstOption,setFirstOption] = useState("");
    const [secondOption,setSecondOption] = useState("");

    function handleNewPollSubmit(e){
        e.preventDefault();
        const question = {
            optionOneText : firstOption,
            optionTwoText : secondOption,
            author : authedUser,
        }

        dispatch(handleAddQuestion(question));

        setFirstOption("");
        setSecondOption("");
     
        navigate("/home");
    }

    const handleFirstOptionChange = (e) => {
        setFirstOption(e.target.value);
    }

    const handleSecondOptionChange = (e) =>{
        setSecondOption(e.target.value)
    }

    return (<div>
        <Nav></Nav>
        <h3>Would You Rather</h3>
        <h6>Create Your Own Poll</h6>
        <form onSubmit={handleNewPollSubmit}>
            <div className="solidborder centerchild">
                <label className="text-center">First Option</label><br/>
                <input data-testid='input-first-option' value={firstOption} type="text" id="firstOption" name="firstOption" style={{ width:"900px" }} onChange={handleFirstOptionChange}/>
                <br/><br/>
                <label className="text-center">Second Option</label><br/>
                <input data-testid='input-second-option' value={secondOption} type="text" id="secondOption" name="secondOption" style={{ width:"900px" }} onChange={handleSecondOptionChange}/><br/><br/>
                <button data-testid='add-poll-btn' type="submit">Submit</button>
            </div>
        </form>
    </div>)
}

const mapStateToProps = ({authedUser}) => ({
    authedUser
})

export default connect(mapStateToProps)(AddNewPoll);