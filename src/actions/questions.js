import { saveQuestion } from "../utils/Api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import {addQuestionToUser} from "./users";


export const ADD_QUESTION = "ADD_QUESTION";
export const _QUESTIONS = "_QUESTIONS";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";


export function addQuestion(question){
    return {
      type: ADD_QUESTION,
      question,
    }
}

export function receiveQuestions(questions){
    return{
      type: RECEIVE_QUESTIONS,
      questions
    }
}

export function handleAddQuestion(question) {
    return (dispatch, getState) => {
      dispatch(showLoading());
  
      return saveQuestion(question)
        .then((question) => 
          { dispatch(addQuestion(question))
            dispatch(addQuestionToUser(question.id,question.author))
          })
        .then(() => dispatch(hideLoading()));
    };
  }

