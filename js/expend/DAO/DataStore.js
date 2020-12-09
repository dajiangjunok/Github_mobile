import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GitHubTrending from 'GitHubTrending';
// import { fetchRepositories } from '@huchenme/github-trending'
export const FLAG_STORAGE = { flag_popular: 'popular', flag_trending: 'trending' };

export default class DataStore {
  /**
   * 获取数据，优先获取本地，如果无本地数据或本地数据过期则获取网络数据
   * @params url
   * @returns Promise
   */
  axiosData (url, flag) {
    return new Promise((resolve, reject) => {
      this.axiosLocalData(url).then(wrapData => {
        if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
          resolve(wrapData);
        } else {
          this.axiosNetData(url, flag).then(data => {
            resolve(this._wrapData(data))
          }).catch(error => {
            reject(error)
          })
        }
      }).catch(() => {
        this.axiosNetData(url, flag).then(data => {
          resolve(this._wrapData(data))
        }).catch(error => {
          reject(error)
        })
      })
    })
  }

  /**
   * 保存数据 
   * @params url  * 
   * @params data *
   * @params callback 
   * 
   * */
  saveData (url, data, callback) {
    if (!data || !url) return
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
  }

  /**
   * 获取本地数据
   * @params   url
   * @returns  {Promise}
   */
  axiosLocalData (url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (err, res) => {
        if (!err) {
          try {
            resolve(JSON.parse(res))
          } catch (e) {
            reject(e)
            console.error(e)
          }
        } else {
          reject(err)
          console.error(err)
        }
      })
    })
  }

  /**
   * 获取网络数据
   * @params   url
   * @params   flag
   * @returns  {Promise}
   */

  axiosNetData (url, flag) {
    return new Promise((resolve, reject) => {
      if (flag !== FLAG_STORAGE.flag_trending) {
        axios.get(url)
          .then(res => {
            if (res.status === 200) {
              return res.data;
            }
            throw new Error('Network response was not ok')
          })
          .then((responseData) => {
            this.saveData(url, responseData);
            resolve(responseData);
          })
          .catch(error => {
            reject(error);
          })
      } else {
        axios.get(url)
          .then(res => {
            if (res.status === 201) {
              return res.data;
            }
            throw new Error('Network response was not ok')
          })
          .then((responseData) => {
            this.saveData(url, responseData);
            resolve(responseData);
          })
          .catch(error => {
            reject(error);
          })
      }
    })
  }

  _wrapData (data) {
    return { data: data, timestamp: new Date().getTime() }
  }

  /**
   * 检查 timeStamp 是否在有效期内
   * @params timeStamp  项目更新时间
   * @return Boolean  true 不需要更新     false需要更新
   */
  static checkTimestampValid (timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false;

    return true;
  }
}