import React from 'react';
import { StyleSheet } from 'react-native';
import ResetEmailOrPasswordContainer from '../../components/containers/ResetEmailOrPasswordContainer';

const EmailScreen = props => {
    return (
        <ResetEmailOrPasswordContainer
            title="Reset Password"
            text="Confirm your email address and we'll send you a
                        verification code."
            placeholder="my@email.com"
            autoCompleteType='email'
            keyboardType='email-address'
            // TODO
            // 1) send email with firebase
            // 2) secure the code a bit more

            onPress={() => {
                props.navigation.navigate('VerifyCode', {
                    code: '1234',
                });
            }}
            buttonText="Send code"
            
        />
    );
};

const styles = StyleSheet.create({});

export default EmailScreen;
