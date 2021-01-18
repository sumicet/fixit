import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Loading from '../../components/loading/Loading';
import { setIsLoading } from '../../store/actions/ui';
import * as Firebase from '../../config/Firebase';
import {
    autoLogIn,
    setIsLoggedIn,
    signOut,
    updateToken,
} from '../../store/actions/auth';

const InitialLoadingScreen = props => {
    const dispatch = useDispatch();

    const detectUserChanges = async () => {
        //setIsLoading(true);
        const unsub = await Firebase.auth.onAuthStateChanged(user => {
            if (user) {
                Firebase.auth.currentUser.getIdToken().then(token => {
                    dispatch(
                        updateToken(Firebase.auth.currentUser.uid, token)
                    ).then(() => {
                        dispatch(autoLogIn()).then(() => {
                            console.log(
                                'token expired / logged in',
                                Firebase.auth.currentUser.uid
                            );
                        });
                    });
                });
            } else {
                dispatch(setIsLoggedIn(false)).then(() => {
                    dispatch(signOut()).then(() => {
                        console.log('logged out');
                    });
                });
            }
        });
        return () => {
            unsub();
        };
    };

    useEffect(() => {
        detectUserChanges().then(() => dispatch(setIsLoading(false)));
    }, []);

    return <Loading />;
};

const styles = StyleSheet.create({});

export default InitialLoadingScreen;
