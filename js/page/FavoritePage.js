import React, { memo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { onThemeChange } from '../action/theme';

const FavoritePage = memo(function (props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>FavoritePage</Text>
      <Button title="修改主题" onPress={() => props.onThemeChange('pink')} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default connect(null, mapDispatchToProps)(FavoritePage);
