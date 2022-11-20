import LeaderBoard from './LeaderBoard';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({authedUser:'mtsamis',users: {mtsamis: {
  id: 'mtsamis',
  password:'xyz123',
  name: 'Mike Tsamis',
  avatarURL: "https://image.freepik.com/free-psd/3d-female-character-holding-tablet-device_23-2148938895.jpg",
  answers: {
    "xj352vofupe1dqz9emx13r": 'optionOne',
    "vthrdm985a262al8qx3do": 'optionTwo',
    "6ni6ok3ym7mf1p33lnez": 'optionOne'
  },
  questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
}}});

describe("LeaderBoard Component", () => {
    it("LeaderBoard should render without throwing an error", () => {
        expect(
          <Provider store={store}>
          <LeaderBoard />
          </Provider>
        ).toMatchSnapshot();
    });

    it("LeaderBoard contains a row for the user", async() => {
      let component = render(
        <Provider store={store}>
          <Router><LeaderBoard /></Router>
        </Provider>
      );
      
      expect(component.getByTestId('leaderboard-tbl')).toBeDefined();
      const table = component.getByTestId('leaderboard-tbl');
      const tableRows = table.children.length;
      expect(tableRows).toEqual(2); 
  });
});