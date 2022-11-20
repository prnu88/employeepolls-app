import { act } from "react-dom/test-utils";
import { RECEIVE_USERS,ANSWER_QUESTION,ADD_QUESTION_TO_USER } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
      case ANSWER_QUESTION:
        const {authedUser, qid, answer} = action;
        return {
          ...state,
          [authedUser] : {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers, 
              [qid]: answer
            }
          }
        }; 
      case ADD_QUESTION_TO_USER:
        const {questionAuthor,questionid} = action;
        return {
          ...state,
          [questionAuthor]: {
            ...state[questionAuthor],
            questions: state[questionAuthor].questions.concat([questionid])
          }
        }

    default:
      return state;
  }
}
