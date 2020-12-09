import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expend/DAO/DataStore'
import { handleData } from '../../action/ActionUtil';

/**
 * 获取最热数据的异步action
 */
export function onLoadTrendingData (storeName, url, pageSize) {
  return dispatch => {
    dispatch({ type: Types.TRENDING_REFRESH, storeName });
    let dataStore = new DataStore();

    dataStore.axiosData(url, FLAG_STORAGE.flag_trending).then(res => {
      handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, res, pageSize);
    }).catch(err => {
      err && console.log(err);
      dispatch({
        type: Types.TRENDING_REFRESH_FAIL,
        storeName,
        error
      })
    })
  }
}

/**
 * 加载更多
 * @param {请求名称} storeName 
 * @param {请求页数} pageIndex 
 * @param {请求条数} pageSize 
 * @param {原始数据} dataArray 
 * @param {回调函数，用来调用页面通信：异常展示，没有更多等待} callback 
 * @return  function 
 */
export function onLoadMoreTrendingData (storeName, pageIndex, pageSize, dataArray = [], callback) {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {  //已加载完全部数据
        if (typeof callback === 'function') {
          callback('已加载全部内容')
          dispatch({
            type: Types.TRENDING_LOAD_MORE_FAIL,
            error: 'no more',
            storeName: storeName,
            pageIndex: --pageIndex,
            projectModes: dataArray
          })
        }
      } else {
        // 本次载入最大的数据量
        const max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;

        dispatch({
          type: Types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max)
        })
      }
    }, 200)
  }
}
