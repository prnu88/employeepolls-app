import Poll from './Poll';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from "@testing-library/react";
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({});

describe("Poll Component", () => {
    it("should render without throwing an error", () => {
        const component = render(
          <Provider store={store}>
            <Router><Poll /></Router>
          </Provider>
        );

        let showBtn = component.getByTestId('show-btn');
        fireEvent.click(showBtn);

        global.window = { location: { pathname: null } };
        expect(global.window.location.pathname).toContain('/questions');
    });
});