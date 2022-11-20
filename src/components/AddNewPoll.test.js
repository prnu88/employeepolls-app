import AddNewPoll from './AddNewPoll';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { fireEvent, render } from "@testing-library/react";
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

describe("AddNewPoll Component", () => {
    it("AddNewPoll should render without throwing an error", () => {
        expect(
          <Provider store={store}>
          <AddNewPoll />
          </Provider>
        ).toMatchSnapshot();
    });

    it("Adding New Poll clears the form", async() => {
      var component = render(
        <Provider store={store}><MemoryRouter><AddNewPoll /></MemoryRouter></Provider>
      );
      
      var inputFirstOption = component.getByTestId('input-first-option');
      var inputSecondOption = component.getByTestId('input-second-option');

      fireEvent.change(inputFirstOption, {target: {value: 'buy a cat'}})
      fireEvent.change(inputSecondOption, {target: {value: 'buy a dog'}})

      var submitBtn = component.getByTestId('add-poll-btn');
      fireEvent.click(submitBtn);

      expect(inputFirstOption.value).toEqual("");
      expect(inputSecondOption.value).toEqual("");
  });
});


