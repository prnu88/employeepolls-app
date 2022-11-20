import {useNavigate} from "react-router-dom";
import { connect } from 'react-redux';
import {formatDate} from "../utils/helpers.js";

function Poll(props) {
    const navigate = useNavigate();
    const {author,timestamp,id} = props;

    function onShowBtnClick(e,question_id){
        e.preventDefault();
        navigate(`/questions/${question_id}`);
    }

    return (<div className="text-center">
        <label>{author}</label><br/>
        <label>{formatDate(timestamp)}</label><br/><br/>
        <button data-testid='show-btn' onClick={(e) => onShowBtnClick(e,id)} className="btnstyle2">Show</button>
    </div>)
}

const mapStateToProps = ({authedUser}) => ({
    loading: authedUser === null,
    authedUser,
  });

export default connect(mapStateToProps)(Poll);