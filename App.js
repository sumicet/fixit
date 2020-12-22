import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useDispatch, useStore } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import AppNavigator from './navigation/AppNavigator';
import Loading from './components/loading/Loading';
import jobReducer from './store/reducers/job';
import uiReducer from './store/reducers/ui';
import authReducer from './store/reducers/auth';
import tradespersonReducer from './store/reducers/tradesperson';

import { LogBox } from 'react-native';
import _ from 'lodash';
import tradespeopleReducer from './store/reducers/tradespeople';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const rootReducer = combineReducers({
    job: jobReducer,
    ui: uiReducer,
    auth: authReducer,
    tradesperson: tradespersonReducer,
    tradespeople: tradespeopleReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

const fetchFonts = () => {
    return Font.loadAsync({
        'Asap-Bold': require('./assets/fonts/Asap-Bold.ttf'),
        'Asap-SemiBold': require('./assets/fonts/Asap-SemiBold.ttf'),
        'Asap-Regular': require('./assets/fonts/Asap-Regular.ttf'),
    });
};

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [dropDownAlertRef, setDropDownAlertRef] = useState();
    const [inAppNotificationVisible, setInAppNotificationVisible] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchFonts().then(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <Provider store={store}>
                <AppNavigator />
            </Provider>
            {/* <FlashMessage position="top" /> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
