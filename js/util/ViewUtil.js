import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ViewUtil extends PureComponent {
  static getLeftBackButton (callBack) {
    return <TouchableOpacity style={{ padding: 8, paddingLeft: 12 }} onPress={callBack}>
      <Ionicons name="ios-arrow-back" size={26} style={{ color: 'white' }} />
    </TouchableOpacity>
  }

  static getRightButton (leftIconName = "sharealt", rightIconName = "staro") {
    return (
      <View style={{ flexDirection: 'row', paddingRight: 8 }}  >
        <TouchableOpacity>
          <AntDesign name={leftIconName} size={26} style={{ color: 'white' }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 8 }}>
          <AntDesign name={rightIconName} size={26} style={{ color: 'white' }} />
        </TouchableOpacity>
      </View>
    )
  }
}
