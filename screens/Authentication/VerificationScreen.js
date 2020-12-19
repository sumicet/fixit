import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '../../components/authentication/Authentication';
import { logIn } from '../../store/actions/auth';

const VerificationScreen = props => {
    const dispatch = useDispatch();
    // const [inAppNotificationVisible, setInAppNotificationVisible] = useState(false);

    const userType = props.route.params && props.route.params.userType;

    const handleOnPress = (email, password) => {
        dispatch(logIn(email, password));
        if (userType === 'tradesperson') {
            props.navigation.navigate('EditTradespersonProfile', {
                action: 'signup',
            });
        } else {
            console.log('customer not yet available');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Authentication
                buttonText="Continue"
                onTextPress={() => {
                    props.navigation.navigate('SignUp');
                }}
                text="Create an account."
                onPress={handleOnPress}
                defaultEmail={props.route.params && props.route.params.email}
                defaultPassword={
                    props.route.params && props.route.params.password
                }
                hideTextFields={true}
            />
            {/* <InAppNotification
                title={"Denied!"}
                message={"Verify your email to log in."}
                inAppNotificationVisible={inAppNotificationVisible}
                hide={() => {setInAppNotificationVisible(false)}}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({});

export default VerificationScreen;
