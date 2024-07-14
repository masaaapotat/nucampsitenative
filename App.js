import Main from './screens/MainComponents';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </Provider>
    );
  //   navigation container is used to manage our navigation and must wrap all our components using navigation
}
