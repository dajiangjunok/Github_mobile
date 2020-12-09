import React, { memo, useEffect, useState, useRef } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet, Button, RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NavigationUtil from '../navigator/NavigatorUtil';
import { onLoadTrendingData, onLoadMoreTrendingData } from '../action/index';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';
import TrendingDialog, { TimeSpanList } from '../common/TrendingDialog';

const URL = 'https://trendings.herokuapp.com/repo?lang=';
// const QUERY_STR = '&since=daily';
const THEME_COLOR = '#678';
const PAGE_SIZE = 10;

const TrendingTab = function (props) {
  const [storeName, setstoreName] = useState(props.tabLabel);
  const [isFlag, setisFlag] = useState(true); // 防止FlatList 到底后触发多次
  const { trending } = useSelector(state => state);
  const trendingDispatch = useDispatch();
  const toastRef = useRef();

  // 方法
  const loadData = (loadMore) => {
    const url = genAxiosUrl(storeName);

    if (loadMore) {
      trendingDispatch(onLoadMoreTrendingData(storeName,
        ++trending[storeName].pageIndex,
        PAGE_SIZE,
        trending[storeName].items,
        callback => {
          return toastRef.current.show(callback, 500)
        }))
    } else {
      trendingDispatch(onLoadTrendingData(storeName, url, PAGE_SIZE))
    }
  }
  const genAxiosUrl = (key) => {
    // https://github.com/trending/vue?since=daily
    return URL + key + props.timeSpan.searchText;
  }

  useEffect(() => {
    loadData(false);
  }, [])

  const renderItem = (data) => {
    const item = data.item;
    return <TrendingItem item={item}
      onSelect={() => {
        NavigationUtil.goPage({
          projectMode: item,
        }, 'DetailPage')
      }} />
  }

  const genIndicator = () => {
    return (trending[storeName] && trending[storeName].hideLoadingMore) ? null :
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
        data={trending[storeName] && trending[storeName].projectModes}
        renderItem={data => renderItem(data)}
        keyExtractor={(item, index) => item.repo + index}

        refreshControl={
          <RefreshControl
            title="Loading..."
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={trending[storeName] && trending[storeName].isLoading}
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

export default memo(function TrendingPage (props) {
  const dialogRef = useRef();
  const [timeSpan, settimeSpan] = useState(TimeSpanList[0]);

  const tabNames = ['Javascript', 'Node', 'C', 'C#', 'PHP'];
  const _genTabs = () => {
    const tabs = {};
    tabNames.forEach((item, index) => {
      tabs[`tabs${index}`] = {
        screen: props => <TrendingTab {...props} timeSpan={timeSpan} tabLabel={item} />,
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
  const renderTitleView = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => dialogRef.current.show()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '400' }}>
              趋势
              {timeSpan.showText}
            </Text>
            <MaterialIcons name={'arrow-drop-down'} size={22} style={{ color: 'white' }} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const onSelectTimeSpan = (tab) => {
    dialogRef.current.dismiss();
    settimeSpan(tab);
  }
  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        titleView={renderTitleView()}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content'
        }}
        style={{ backgroundColor: THEME_COLOR }}
      />
      <TabNavigator />
      <TrendingDialog ref={dialogRef} onSelect={tab => onSelectTimeSpan(tab)} />
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
