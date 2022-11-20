var Data = require("./_DATA")

describe('_saveQuestion', () => {
    it('Will create new question and save it and return the formatted question', async() => {
        const optionOneText = "Play soccer";
        const optionTwoText = "Play tennis";
        const authorname = "tymgin";
        var question = {
            optionOneText: optionOneText,
            optionTwoText: optionTwoText,
            author: authorname
        }
        var formattedQuestion = await Data._saveQuestion(question);
        expect(Object.values(formattedQuestion).includes(optionOneText));
        expect(Object.values(formattedQuestion).includes(optionTwoText));
        expect(Object.values(formattedQuestion).includes(authorname));
    });

    it('Error returned when incorrect or empty data is passed to save function', async() => {
        const optionOneText = null;
        const optionTwoText = null;
        const authorname = null;
        let question = {
            optionOneText: optionOneText,
            optionTwoText: optionTwoText,
            author: authorname
        }
        await expect(Data._saveQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
})

describe('_saveQuestionAnswer', () => {
    it('Will return true if answer was sucessfully saved', async() => {
        const authedUser = "sarahedo";
        const qid = '8xf0y6ziyjabvozdd253nd';
        const answer ="optionOne";
        const answerObj = {
            authedUser: authedUser,
            qid: qid,
            answer: answer
        }
        var result = await Data._saveQuestionAnswer(answerObj);
        expect(result).toEqual(true);
    });

    it('Error returned when incorrect or empty data is passed to save answer function', async() => {
        const authedUser = "sarahedo";
        const qid = null;
        const answer = null;
        const answerObj = {
            authedUser: authedUser,
            qid: qid,
            answer: answer
        }
        await expect(Data._saveQuestionAnswer(answerObj)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });
})
