import { CommonActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';

const InitialLoadingScreen = props => {
    const isLoading = useSelector(state => state.ui.isLoading);
    const userId = useSelector(state => state.auth.userId);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        !isLoading &&
            userId === null &&
            !isLoggedIn &&
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'LogIn',
                        },
                    ],
                })
            );
        !isLoading &&
            isLoggedIn &&
            userId &&
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {
                            name: 'BottomTab',
                        },
                    ],
                })
            );
    }, [isLoading, userId, isLoggedIn]);

    return <Loading />;
};

const styles = StyleSheet.create({});

export default InitialLoadingScreen;
