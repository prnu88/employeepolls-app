import PollOption from "./PollOption";
import Nav from "./Nav";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {handleAnswerQuestion} from "../actions/users";
import LoginPage from "./LoginPage";
import PollErrorPage from "./PollErrorPage";
import { updateUserAnswerQuestion } from "../actions/questions";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };

function PollDetails({authedUser,question_id,question,users,dispatch}) {
    const questionAuthor = users && question ? users[question.author] : {};
    const avatarimgurl = questionAuthor ? questionAuthor.avatarURL : "";
    const authedUserObj = users ? users[authedUser] : {};
    const totalUsersCount = users ? Object.keys(users).length  : 0;
    const optionOneVotesCount = question ? question.optionOne.votes.length : 0;
    const optionTwoVotesCount = question ? question.optionTwo.votes.length : 0;
    const percentOptionOneVotes = (optionOneVotesCount/totalUsersCount) * 100;
    const percentOptionTwoVotes = (optionTwoVotesCount/totalUsersCount) * 100;
    const isAnswered =  authedUserObj ? Object.keys(authedUserObj.answers).includes(question_id) : false;
    const answeredValue = authedUserObj ? authedUserObj.answers[question_id] : {};
    const optionOneSelected = answeredValue === "optionOne";
    const optionTwoSelected = answeredValue === "optionTwo";
    const qstnAuthorName = question ? question.author : "";
    const optionOneText = question ? question.optionOne.text : "";
    const optionTwoText = question ? question.optionTwo.text : "";

    const answerPollDetailsOnClick = (text) => {
        dispatch(handleAnswerQuestion(authedUser, question_id, text));
        dispatch(updateUserAnswerQuestion(authedUser,question_id,text));
    };

    if(!authedUser){
        return (<LoginPage></LoginPage>)
    }
    else if(!question){
       return (<PollErrorPage></PollErrorPage>)
    }
    else return (
        <div>
            <Nav></Nav>
            <h3>Poll By {qstnAuthorName}</h3>
            <div className="imgcontainer"><img alt="avatar" src={avatarimgurl} className="avatarpic"/></div>
            <div className="parent centerchild">
            <h4>Would you Rather</h4>
                <div className='child'><PollOption isAnswered={isAnswered} optionSelected={optionOneSelected} votes={optionOneVotesCount} votesPercent={percentOptionOneVotes} option="optionOne" text={optionOneText} answerPollDetailsOnClick={answerPollDetailsOnClick}/></div>
                <div className='child'><PollOption isAnswered={isAnswered} optionSelected={optionTwoSelected} votes={optionTwoVotesCount} votesPercent={percentOptionTwoVotes} option="optionTwo" text={optionTwoText} answerPollDetailsOnClick={answerPollDetailsOnClick}/></div>
            </div>
        </div>
    )
    
}

const mapStateToProps = ({authedUser,questions,users},props) => {
    const {question_id} = props.router.params;
    return{
        authedUser,
        question_id,
        question: questions[question_id],
        users
    }
};

export default withRouter(connect(mapStateToProps)(PollDetails));
