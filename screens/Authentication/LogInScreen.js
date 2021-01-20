import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Authentication from '../../components/authentication/Authentication';
import Loading from '../../components/loading/Loading';
import { logIn } from '../../store/actions/auth';

const LogInScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState();

    const handleOnPress = (email, password) => {
        dispatch(logIn(email, password))
            .then(() => {
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
            });
    };

    if(isLoading) {
        return <Loading />
    }

    return (
        <View style={{ flex: 1 }}>
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
        </View>
    );
};

const styles = StyleSheet.create({});

export default LogInScreen;
