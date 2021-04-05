/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import setup,{persistor, storeObj} from "./src/store/setup";
import { Provider } from 'react-redux';
import Souqways from "./src/app";
import Loader from './src/components/common/Loader';
import constants from './src/constants';

const App = () => {
   StatusBar.setBarStyle(Platform.OS==="android"?"light-content":"dark-content", true);
    StatusBar.setBackgroundColor(constants.colors.Primary, true)
  return (
    <Provider store={setup()}>
      <PersistGate
          loading={<Loader />}
        persistor={persistor}>
          <Souqways />
      </PersistGate>
    </Provider>
     
  );
};

export default App;
