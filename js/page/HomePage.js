import React, { PureComponent } from 'react';
import DynamicTabNavigator from '../navigator/DynamicTabNavigators';
import NavigationUtil from '../navigator/NavigatorUtil';

export default class HomePage extends PureComponent {
  render () {
    // 此操作源于通过DynamicTabNavigator阻断了原本的navigation跳转，因此需要这层传递，将断开的链条连接上
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />
  }
}
