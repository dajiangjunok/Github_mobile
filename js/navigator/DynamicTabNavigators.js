
import React, { PureComponent, Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';

import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MinePage from '../page/MinePage';

const TABS = { //在这里配置页面的路由
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons name="whatshot" size={26} style={{ color: tintColor }}></MaterialIcons>
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name="md-trending-up" size={26} style={{ color: tintColor }}></Ionicons>
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons name="favorite" size={26} style={{ color: tintColor }}></MaterialIcons>
      )
    }
  },
  MinePage: {
    screen: MinePage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <EvilIcons name="user" size={26} style={{ color: tintColor }}></EvilIcons>
      )
    }
  }
}

class TabBarComponent extends Component {
  render () {
    return <BottomTabBar {...this.props}
      activeTintColor={this.props.theme} />
  }
}

class DynamicTabNavigator extends PureComponent {
  constructor(props) {
    super(props);
  }

  _tabNavigator () {
    if (this.Tabs) {
      return this.Tabs
    }
    const { PopularPage, TrendingPage, FavoritePage, MinePage } = TABS;
    const tabs = { PopularPage, TrendingPage, FavoritePage, MinePage }; //显示的底部导航
    // PopularPage.navigationOptions.tabBarLabel = '最热'; // 动态修改Tab属性
    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props => <TabBarComponent theme={this.props.theme} {...props} />
    }))
  }

  render () {
    const Tab = this._tabNavigator();
    return <Tab />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect(mapStateToProps, null)(DynamicTabNavigator);

