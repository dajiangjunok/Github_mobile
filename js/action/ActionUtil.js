/**
 * @param {*} dispatch 
 * @param {*} storeName 
 * @param {数据} res 
 * @param {数据条数} pageSize 
 */
export function handleData (actionType, dispatch, storeName, res, pageSize) {
  let fixItems = [];
  if (res && res.data) {
    if (Array.isArray(res.data)) {
      fixItems = res.data;
    } else if (Array.isArray(res.data.items)) {
      fixItems = res.data.items;
    }
  }
  dispatch({
    type: actionType,
    items: fixItems,
    projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), //第一次要加载的数据
    storeName,
    pageIndex: 1
  })
}