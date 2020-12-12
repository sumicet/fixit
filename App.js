import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import FlashMessage from 'react-native-flash-message';

import AppNavigator from './navigation/AppNavigator';
import Loading from './components/loading/Loading';
import jobReducer from './store/reducers/job';
import uiReducer from './store/reducers/ui';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    job: jobReducer,
    ui: uiReducer,
    auth: authReducer
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
