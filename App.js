import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import AppNavigator from './navigation/AppNavigator';
import Loading from './components/loading/Loading';
import quizReducer from './store/reducers/quiz';

const rootReducer = combineReducers({
    quiz: quizReducer,
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
        <Provider store={store}>
            <View style={styles.container}>
                <AppNavigator />
                <StatusBar style="dark" translucent={true} />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
