import React, { memo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
// import NavigationUtil from '../navigator/NavigatorUtil';

const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = '#678';

export default memo(function DetailPage (props) {
  const params = props.navigation.state.params;

  const { projectMode } = params;
  console.log(projectMode);
  const init_url = projectMode.repo_link || projectMode.html_url || TRENDING_URL + projectMode.fullName;
  const init_title = projectMode.repo || projectMode.full_name || projectMode.fullName;
  const [title, settitle] = useState(init_title);
  const [url, seturl] = useState(init_url);
  const [canGoBack, setcanGoBack] = useState(false);
  const webRef = useRef();

  const onBack = () => {
    if (canGoBack) {
      webRef.current.goBack();
    } else {
      // NavigationUtil.goPage(null,props.navigation);
      props.navigation.goBack()
    }
  }

  const navigationBar = <NavigationBar
    leftButton={ViewUtil.getLeftBackButton(() => onBack())}
    title={title}
    style={{ backgroundColor: THEME_COLOR }}
    rightButton={ViewUtil.getRightButton('sharealt', 'staro')}
  />

  const onNavigationStateChange = (navState) => {
    setcanGoBack(navState.canGoBack);
    seturl(navState.url)
  }

  return (
    <View style={styles.container}>
      {navigationBar}
      <WebView ref={webRef}
        startInLoadingState={true}
        renderLoading={() => {
          return <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }} size="small" color={THEME_COLOR} />
        }}
        onNavigationStateChange={e => onNavigationStateChange(e)}
        source={{ uri: url }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

