import React, { memo } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default memo(function TrendingItem (props) {
  const { item } = props;
  if (!item) return null;

  let favoriteButton = (
    <TouchableOpacity
      style={{ padding: 6 }}
      onPress={() => {

      }}
      underlayColor={'transparent'}
    >
      <FontAwesome
        name={'star-o'}
        size={26}
        style={{ color: 'red' }}
      />
    </TouchableOpacity>
  )
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.cell_container}>
        <Text style={styles.title}>
          {item.repo}
        </Text>
        <Text style={styles.description}>
          {item.desc}
        </Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Developer:</Text>
            {item.avatars.map(url => {
              return <Image style={{ height: 22, width: 22 }} key={url}
                source={{ uri: url }} />
            })}
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text>Start:</Text>
            <Text>{item.stars}</Text>
          </View>
          {favoriteButton}
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',   //ios
    shadowOffset: { width: 0.5, height: 0.5 },  //ios
    shadowOpacity: 0.4,  //ios
    shadowRadius: 1,  //ios
    elevation: 2   //android
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  }
})