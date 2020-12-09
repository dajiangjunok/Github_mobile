import React, { memo, useEffect, useState, useRef } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet, Button, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Toast from 'react-native-easy-toast'
// import NavigationUtil from '../navigator/NavigatorUtil';
import { onLoadPopularData, onLoadMorePopularData } from '../action/index';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigatorUtil';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const PAGE_SIZE = 10;

const PopularTab = function (props) {
  const [storeName, setstoreName] = useState(props.tabLabel);
  const [isFlag, setisFlag] = useState(true); // 防止FlatList 到底后触发多次
  const { popular } = useSelector(state => state);
  const popularDispatch = useDispatch();
  const toastRef = useRef();

  // 方法
  const loadData = (loadMore) => {
    const url = genAxiosUrl(storeName);

    if (loadMore) {
      popularDispatch(onLoadMorePopularData(storeName, ++popular[storeName].pageIndex, PAGE_SIZE, popular[storeName].items, callback => {
        return toastRef.current.show(callback, 500)
      }))
    } else {
      popularDispatch(onLoadPopularData(storeName, url, PAGE_SIZE))
    }
  }
  const genAxiosUrl = (key) => {
    console.log(URL + key + QUERY_STR);
    return URL + key + QUERY_STR;
  }

  useEffect(() => {
    loadData(false);
  }, [])

  const renderItem = (data) => {
    const item = data.item;
    return <PopularItem item={item}
      onSelect={() => {
        NavigationUtil.goPage({
          projectMode: item,
        }, 'DetailPage')
      }} />
  }

  const genIndicator = () => {
    return (popular[storeName] && popular[storeName].hideLoadingMore) ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          color="orange"
          style={styles.indicator} />
        <Text>正在加载更多</Text>
      </View>
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={popular[storeName] && popular[storeName].projectModes}
        renderItem={data => renderItem(data)}
        keyExtractor={item => item.id.toString()}

        refreshControl={
          <RefreshControl
            title="Loading..."
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={popular[storeName] && popular[storeName].isLoading}
            onRefresh={() => loadData()}
            tintColor={THEME_COLOR}
          />
        }
        ListFooterComponent={() => genIndicator()}
        onEndReached={() => {
          setTimeout(() => {
            if (isFlag) loadData(true);
            setisFlag(false)
          }, 200)
        }}
        onMomentumScrollBegin={() => {
          setisFlag(true)
        }}
        onEndReachedThreshold={0.1}
      />
      <Toast ref={toastRef}
        position='top'
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
      />
    </View>
  )
}

export default memo(function PopularPage (props) {
  const tabNames = ['Java', 'Android', 'ios', 'React', 'React-native', 'Php'];
  const _genTabs = () => {
    const tabs = {};
    tabNames.forEach((item, index) => {
      tabs[`tabs${index}`] = {
        screen: props => <PopularTab {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        }
      }
    })
    return tabs;
  };

  const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
    _genTabs(),
    {
      lazy: true,
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
          backgroundColor: '#a67',
        },
        indicatorStyle: {
          height: 2,
          backgroundColor: 'white'
        }
      }
    }
  ))
  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        title={'最热'}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content'
        }}
        style={{ backgroundColor: THEME_COLOR }}
      />
      <TabNavigator />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    width: 6,
    height: 6,
    color: 'red',
    margin: 10
  }
})
