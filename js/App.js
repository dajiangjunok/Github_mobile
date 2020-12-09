import AppNavigators from './navigator/AppNavigators';
import React, { memo } from 'react';
import { Provider } from 'react-redux';
import store from '../js/store';

export default memo(function App () {
  return (
    <Provider store={store}>
      <AppNavigators />
    </Provider>
  )
})
