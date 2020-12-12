import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import InAppNotification from '../../components/alert/InAppNotification';
import Authentication from '../../components/authentication/Authentication';
import { logIn } from '../../store/actions/auth';
import * as Firebase from '../../config/Firebase'

const LogInScreen = props => {
    const dispatch = useDispatch();
    const [inAppNotificationVisible, setInAppNotificationVisible] = useState(false);

    const handleOnPress = (email, password) => {
        Firebase.auth
            .signInWithEmailAndPassword(email, password)
            .then(userData => {
                if (userData.user.emailVerified) {
                    dispatch(logIn());
                    console.log(userData.user)
                } else {
                    setInAppNotificationVisible(true);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <View style={{flex: 1}}>
            <Authentication
                buttonText="Log In"
                onTextPress={() => {
                    props.navigation.navigate('SignUp');
                }}
                text="Create an account."
                onPress={handleOnPress}
                defaultEmail={props.route.params && props.route.params.email}
                defaultPassword={
                    props.route.params && props.route.params.password
                }
            />
            <InAppNotification
                title={"Denied!"}
                message={"Verify your email to log in."}
                inAppNotificationVisible={inAppNotificationVisible}
                hide={() => {setInAppNotificationVisible(false)}}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default LogInScreen;
