import React, { memo, useState } from 'react';
import { ScrollView, View, Text, TextInput, Button } from 'react-native';

import DataStore from '../expend/DAO/DataStore';
const dataStore = new DataStore();

export default memo(function DataStoreDemoPage () {
  const [searchKey, setsearchKey] = useState('');
  const [string, setstring] = useState('暂无数据')

  const loadData = () => {
    const url = `https://api.github.com/search/repositories?q=${searchKey}`
    dataStore.axiosData(url).then(res => {
      setstring(JSON.stringify(res))
    }).catch(err => {
      err && console.log(err);
    })
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'cyan' }}>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'cyan' }}> */}
      <Text>离线缓存框架设计</Text>
      <TextInput value={searchKey} onChangeText={text => setsearchKey(text)} style={{ borderWidth: 2, borderColor: '#666', width: 400 }} />
      <Button title='获取' onPress={() => { loadData() }} />
      <Text>{string}</Text>
      {/* </View> */}
    </ScrollView>
  )
})
