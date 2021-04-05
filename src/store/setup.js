import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import promise from "./promise";
import array from "./array";
import {
  persistStore,
  persistCombineReducers,
  getStoredState,
} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import reducer from "../reducers/";
export var storeObj = {};
export var persistor = {};
const logger = createLogger();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "loginReducer",
    "getCartListReducer",
    "appState",
    "getWishListReducer",
  ],
  blacklist: [],
};

export default () => {
  var store = createStore(
    persistCombineReducers(persistConfig, reducer),
    {},
    applyMiddleware(logger, thunk, array, promise),
  );
  storeObj = store;
  persistor = persistStore(store, {}, async () => {
    await store.dispatch({type: "CLEAR_LOADERS"});
  });

  return store;
};
