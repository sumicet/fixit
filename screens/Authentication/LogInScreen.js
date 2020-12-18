import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import InAppNotification from '../../components/alert/InAppNotification';
import Authentication from '../../components/authentication/Authentication';
import { autoLogIn, logIn } from '../../store/actions/auth';

const LogInScreen = props => {
    const dispatch = useDispatch();
    // const [inAppNotificationVisible, setInAppNotificationVisible] = useState(false);

    const handleOnPress = (email, password) => {
        dispatch(logIn(email, password));
    };

    useEffect(() => {
        dispatch(autoLogIn());
    }, []);

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

export default LogInScreen;
