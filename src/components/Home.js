import Poll from "./Poll";
import Nav from "./Nav";
import { connect } from 'react-redux';

function Home(props){    
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
  
   
    return (<div>
        <Nav></Nav>
        <div className="solidborder">
            <h4>New Questions</h4>
        </div>
        <div  className="solidborder">   
            <div className="parent">
                {unAnsweredQuestionsArr.map((unAnsweredQuestion) => (
                    <div className="child">
                        <Poll key={unAnsweredQuestion.id} id={unAnsweredQuestion.id} author={unAnsweredQuestion.author} timestamp={unAnsweredQuestion.timestamp}/>
                    </div>
                ))}
            </div>
        </div>
        <div><br/></div>
        <div className="solidborder">
            <h4>Done</h4>
        </div>
        <div className="solidborder">
            <div className="parent">
                {answeredQuestionsArr.map((answeredQuestion) => (
                        <div className="child">
                            <Poll  key={answeredQuestion.id}id={answeredQuestion.id} author={answeredQuestion.author} timestamp={answeredQuestion.timestamp}/>
                        </div>
                    ))}
            </div>
        </div>
      
    </div>)
}

const mapStateToProps = ({authedUser,users,questions}) => ({
    loading: authedUser === null,
    authedUser,
    users,
    questions,
  });

export default connect(mapStateToProps)(Home);