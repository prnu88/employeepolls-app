import Home from './Home';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Home Component", () => {
    it("should render without throwing an error", () => {
        expect(
          <Provider store={store}>
          <Home />
          </Provider>
        ).toMatchSnapshot();
    });
});