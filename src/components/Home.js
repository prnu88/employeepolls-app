import Poll from "./Poll";
import Nav from "./Nav";
import { connect } from 'react-redux';
import { useState } from "react";

function Home(props){    
    const [answeredQuestionVisible, setAnsweredQuestionVisible] = useState(false);  
    const [unAnsweredQuestionVisible, setUnAnsweredQuestionVisible] = useState(true);  
    const {users,questions} = props;

    const currentUser = users[props.authedUser];
    const answers = currentUser.answers;
    const answeredQuestionsArr = [];
    const unAnsweredQuestionsArr = [];

    for (const key in questions) {
        if( Object.getOwnPropertyNames(answers).includes(key) ){
            answeredQuestionsArr.push(props.questions[key])
        }else{
            unAnsweredQuestionsArr.push(props.questions[key])
        }
    }

    answeredQuestionsArr.sort(
        (a, b) => b.timestamp - a.timestamp
      );

    unAnsweredQuestionsArr.sort(
        (a, b) => b.timestamp - a.timestamp
     );

     function showUnansweredPolls(e){
        if(unAnsweredQuestionVisible !== true){
            setUnAnsweredQuestionVisible(true);
            setAnsweredQuestionVisible(false);
        }
     };

     function showAnsweredPolls(e){
        if(answeredQuestionVisible !== true){
            setAnsweredQuestionVisible(true);
            setUnAnsweredQuestionVisible(false);
        }
    };
  
   
    return (<div>
        <Nav></Nav>
        <div className="togglecontainer">
            <button className="btnstyle3" onClick={(e) => showUnansweredPolls(e)}>Unanswered Polls</button>
            <button className="btnstyle3" onClick={(e) => showAnsweredPolls(e)}>Answered Polls</button>
        </div>
        {unAnsweredQuestionVisible ? 
            <div>
            <div className="solidborder">
                <h4>New Questions</h4>
            </div>
            <div  className="solidborder">   
                <div className="parent">
                    {unAnsweredQuestionsArr.map((unAnsweredQuestion) => (
                        <div key={unAnsweredQuestion.id} className="child">
                            <Poll key={unAnsweredQuestion.id} id={unAnsweredQuestion.id} author={unAnsweredQuestion.author} timestamp={unAnsweredQuestion.timestamp}/>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        : <div><br/></div>}
        
        {answeredQuestionVisible ?  
            <div>               
            <div className="solidborder">
                <h4>Done</h4>
            </div>
            <div className="solidborder">
                <div className="parent">
                    {answeredQuestionsArr.map((answeredQuestion) => (
                            <div  key={answeredQuestion.id} className="child">
                                <Poll  key={answeredQuestion.id} id={answeredQuestion.id} author={answeredQuestion.author} timestamp={answeredQuestion.timestamp}/>
                            </div>
                        ))}
                </div>
            </div>
            </div>
        : <div></div>}
    </div>)
}

const mapStateToProps = ({authedUser,users,questions}) => ({
    loading: authedUser === null,
    authedUser,
    users,
    questions,
  });

export default connect(mapStateToProps)(Home);