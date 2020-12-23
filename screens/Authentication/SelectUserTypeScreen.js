import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OptionSelector from '../../components/common/OptionSelector';
import { setUserType, signUp } from '../../store/actions/auth';

const OptionScreen = props => {
    const dispatch = useDispatch();

    const email = props.route.params && props.route.params.email;
    const password = props.route.params && props.route.params.password;

    const handlePress = userType => {
        dispatch(signUp(email, password, userType));
        props.navigation.navigate('VerifyEmail', {
            screen: 'Verification',
            params: {
                email,
                password,
                userType,
            },
        });
    };

    return (
        <OptionSelector
            text1="Customer"
            onPress1={() => handlePress('customer')}
            text2="Tradesperson"
            onPress2={() => handlePress('tradesperson')}
        />
    );
};

const styles = StyleSheet.create({});

export default OptionScreen;
