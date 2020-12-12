import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '../../components/common/Touchable';
import Empty from '../../components/empty/Empty';
import * as firebase from '../../config/Firebase';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

const MessagesScreen = props => {
    const firebaseTest = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log(userInfo)
          } catch (error) {
            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //   // when user cancels sign in process,
            //   Alert.alert('Process Cancelled')
            // } else if (error.code === statusCodes.IN_PROGRESS) {
            //   // when in progress already
            //   Alert.alert('Process in progress')
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //   // when play services not available
            //   Alert.alert('Play services are not available')
            // } else {
            //   // some other error
            //   Alert.alert('Something else went wrong... ', error.toString())
            //   setError(error)
            // }
          }
    };

    return (
        <Touchable
            style={{
                flex: 0,
                backgroundColor: 'pink',
                height: 200,
                width: 300,
            }}
            onPress={firebaseTest}
        ></Touchable>
    );
};

const styles = StyleSheet.create({});

export default MessagesScreen;
