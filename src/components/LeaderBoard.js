import Nav from "./Nav";
import { connect } from 'react-redux';
import LoginPage from "./LoginPage";

function LeaderBoard(props) {
  const {usersIds,users}= props;

  if(!props.authedUser){
    return (<LoginPage></LoginPage>)
  }

    return (<div>
        <Nav></Nav>
        <div className="table1" >
            <table data-testid='leaderboard-tbl'>
              <tbody>
            <tr>
                  <th>Users</th>
                  <th>Answered</th>
                  <th>Created</th>
                  <th>Total</th>
            </tr>
              {usersIds.map((userId) => (
                  <tr key={userId}>
                    <td>
                      <div><img alt="Avatar" src={users[userId].avatarURL} className="avatar"/></div>
                      <div>{users[userId].name}</div>
                      <div>{userId}</div>
                    </td>
                    <td>{users[userId].totalAnswers}</td>
                    <td>{users[userId].totalQuestions}</td>
                    <td>{users[userId].total}</td>
                  </tr>
              ))}
              </tbody>
      </table>
    </div>
    </div>)
}

const mapStateToProps = ({authedUser,users}) => ({
    authedUser,
    usersIds: Object.keys(users).sort(
      (a, b) => {
        const totalAnswers_a = Object.keys(users[a].answers).length;
        const totalQuestions_a = Object.keys(users[a].questions).length;
        const total_a = totalAnswers_a + totalQuestions_a;
        users[a].totalQuestions = totalQuestions_a;
        users[a].totalAnswers = totalAnswers_a;
        users[a].total = total_a;
        const totalAnswers_b = Object.keys(users[b].answers).length;
        const totalQuestions_b = Object.keys(users[b].questions).length;
        const total_b = totalAnswers_b + totalQuestions_b;
        users[b].totalQuestions = totalQuestions_b;
        users[b].totalAnswers = totalAnswers_b;
        users[b].total = total_b;
        return users[b].total - users[a].total;
      }
    ),
    users, 
  });
  
export default connect(mapStateToProps)(LeaderBoard);