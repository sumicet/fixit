import React from 'react';
import { StyleSheet } from 'react-native';
import ResetEmailOrPasswordContainer from '../../components/containers/ResetEmailOrPasswordContainer';

const VerifyCodeScreen = props => {
    return (
        <ResetEmailOrPasswordContainer
            title="Confirm code"
            text="Confirm your verification code to proceed forward. The code will expire in 5 minutes."
            placeholder="code"
            onPress={() => {
                props.navigation.navigate('ResetPassword');
            }}
            buttonText="Submit code"
            secureTextEntry={true}
            autoCompleteType='off'
            keyboardType='number-pad'
        />
    );
};

const styles = StyleSheet.create({});

export default VerifyCodeScreen;
