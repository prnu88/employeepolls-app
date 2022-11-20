import {saveQuestionAnswer} from "../utils/Api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionToUser(questionid,questionAuthor){
  return {
    type: ADD_QUESTION_TO_USER,
    questionid,
    questionAuthor
  }
}

export function answerQuestion(authedUser, qid, answer){
  return {
    type: ANSWER_QUESTION,
    authedUser, 
    qid, 
    answer
  }
}

export function handleAnswerQuestion(authedUser, qid,  answer){
  return (dispatch, getState) => {
      dispatch(showLoading());
  
      return saveQuestionAnswer(authedUser, qid, answer)
        .then(() => dispatch(answerQuestion(authedUser, qid, answer)))
        .then(() => dispatch(hideLoading()));
    };
}


