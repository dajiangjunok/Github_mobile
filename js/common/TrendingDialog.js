import React, { PureComponent } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../model/TimeSpan';
export const TimeSpanList = [new TimeSpan('今 天', '&since=daily'), new TimeSpan('本 周', '&since=weekly'), new TimeSpan('本 月', '&since=monthly')];

export default class TrendingDialog extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  show () {
    this.setState({
      visible: true
    })
  }
  dismiss () {
    this.setState({
      visible: false
    })
  }
  render () {
    const { onClose, onSelect } = this.props;
    return (
      <Modal
        transparent={true}

        visible={this.state.visible}
        onRequestClose={() => onClose}

      >
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.dismiss()}
        >
          <MaterialIcons
            name={'arrow-drop-up'}
            size={36}
            style={styles.arrow}
          />
          <View style={styles.content}>
            {
              TimeSpanList.map((item, index, arr) => {
                return (
                  <View key={item.showText}>
                    <TouchableOpacity
                      onPress={() => onSelect(item)}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          {item.showText}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {
                      index !== arr.length - 1 && <View style={styles.line}></View>
                    }
                  </View>
                )
              })
            }
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center'
  },
  arrow: {
    marginTop: 40,
    color: 'white',
    padding: 0,
    margin: -15
  },
  content: {
    backgroundColor: 'white',
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: "#000",
    fontSize: 16,
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26
  },
  line: {
    height: 0.4,
    backgroundColor: 'darkgray'
  }
})
