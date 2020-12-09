import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import DataStoreDemoPage from '../page/DataStoreDemoPage';

const InitNavgator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      headerShown: false  //隐藏头部
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      headerShown: false  //隐藏头部
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: false
    }
  },
  DataStoreDemoPage: {
    screen: DataStoreDemoPage,
  }
});

export default createAppContainer(createSwitchNavigator({
  Init: InitNavgator,
  Main: MainNavigator
}, {
  navigationOptions: {
    headerShown: false
  }
}));