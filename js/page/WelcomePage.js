import React, { memo, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import NavigatorUtil from '../navigator/NavigatorUtil';

export default memo(function WelcomePage (props) {

  useEffect(() => {
    const timer = setTimeout(() => {
      NavigatorUtil.resetToHomePage(props)
    }, 2000)
    return () => {
      timer && clearTimeout(timer)
    }
  }, [])

  return (
    <SafeAreaView style={styles.mainStyle}>
      <View>
        <Text>Welcome React-native</Text>
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
