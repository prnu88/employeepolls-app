import '../App.css';
import LoginPage from './LoginPage';
import { Fragment } from 'react';
import {Routes,Route} from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import AddNewPoll from './AddNewPoll';
import PollDetails from "./PollDetails";
import NotFound from "./NotFound";

const App = (props) => {

  return (
    <Fragment>
      <div className='container'>
        <Routes>  
          <Route path="/" exact element={<LoginPage/>}></Route>
          <Route path="/home" exact element={<Home/>}></Route>
          <Route path="/leaderboard" exact element={<LeaderBoard/>}></Route>
          <Route path="/add" exact element={<AddNewPoll/>}></Route>
          <Route path="/questions/:question_id" exact element={<PollDetails/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
    </Fragment>
  )
}

export default App;
