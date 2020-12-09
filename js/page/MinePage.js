import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import ViewUtil from '../util/ViewUtil';

import { onThemeChange } from '../action/theme';

import NavigationBar from '../common/NavigationBar';
const THEME_COLOR = '#678';

const LeftButton = memo(function (props) {
  return <TouchableOpacity style={{ paddingLeft: 8 }} >
    <AntDesign name="left" size={26} style={{ color: 'white' }} />
  </TouchableOpacity>
})

const MinePage = memo(function (props) {
  const [isShow, setisShow] = useState(false);

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'我的'}
        leftButton={<LeftButton />}
        rightButton={ViewUtil.getRightButton()}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content'
        }}
        style={{ backgroundColor: THEME_COLOR }}
      />

      <Text style={styles.welcome}>MinePage</Text>
      <Button title="修改主题" onPress={() => props.onThemeChange('red')}
      />
      <Button title="显示指示器" onPress={() => {
        console.log(isShow);
        return setisShow(!isShow)
      }}
      />
      <View>
        <ActivityIndicator color={'black'} animating={isShow} size={60} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(MinePage);

