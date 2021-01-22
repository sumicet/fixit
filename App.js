import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { StatusBar } from 'expo-status-bar';

import jobReducer from './store/reducers/job';
import uiReducer from './store/reducers/ui';
import authReducer from './store/reducers/auth';
import tradespersonReducer from './store/reducers/tradesperson';

import { LogBox } from 'react-native';
import _ from 'lodash';
import tradespeopleReducer from './store/reducers/tradespeople';
import AppContainer from './AppContainer';
import reviewsReducer from './store/reducers/reviews';
import customersReducer from './store/reducers/customers';

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
    reviews: reviewsReducer,
    customers: customersReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
    return (
        <View style={styles.container}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
            <StatusBar style='light' StatusBarAnimation="fade" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
