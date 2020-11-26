import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import FlashMessage from "react-native-flash-message";

import AppNavigator from './navigation/AppNavigator';
import Loading from './components/loading/Loading';
import quizReducer from './store/reducers/quiz';
import jobReducer from './store/reducers/job';

import Color from './constants/Color';

const rootReducer = combineReducers({
    quiz: quizReducer,
    job: jobReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

const fetchFonts = () => {
    return Font.loadAsync({
        'asap-bold': require('./assets/fonts/Asap-Bold.ttf'),
        'asap-semibold': require('./assets/fonts/Asap-SemiBold.ttf'),
        'asap-regular': require('./assets/fonts/Asap-Regular.ttf'),
    });
};

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [dropDownAlertRef, setDropDownAlertRef] = useState();

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
                <AppNavigator dropDownAlertRef={dropDownAlertRef} />
                <StatusBar barStyle='dark-content' backgroundColor={Color.primaryColor} />
            </Provider>
            <FlashMessage position="top" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
