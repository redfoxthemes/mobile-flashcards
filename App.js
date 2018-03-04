// The app works correctly in either Android OR iOS devices (or emulator).
// Project README identifies which platform(s) have been tested.

import React from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { styles } from './components/styles';
import reducer from './utils/reducers';
import thunk from 'redux-thunk';

import { StackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import SingleDeck from './components/SingleDeck';

import { setLocalNotification } from './utils/notifications';

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {

    const store = createStore(
      reducer,
      compose(applyMiddleware(thunk))
    );

    const MainNavigator = StackNavigator(
    {
      Home: { screen: DeckList },
      SingleDeck: { screen: SingleDeck },
      AddDeck: { screen: AddDeck },
      AddCard: { screen: AddCard },
      Quiz: { screen: Quiz },
    },
      {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
              backgroundColor: 'gray',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          },
      }
    );

    return (
      <Provider store={store}>
           <View  style={{flex: 1}}>
               <MainNavigator />
           </View>
     </Provider>
    );
  }
}
