import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Firebase from '../../config/Firebase';

export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const AUTO_LOG_IN = 'AUTO_LOG_IN';
export const SET_IS_LOGGED_IN_TO_TRUE = 'SET_IS_LOGGED_IN_TO_TRUE';
export const SET_USER_TYPE = 'SET_USER_TYPE';
export const VERIFY_EMAIL = 'VERIFY_EMAIL';

const saveUserDataToStorage = (token, userId) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
        })
    );
};

const verifyEmail = () => {
    return async dispatch => {
        const value = Firebase.auth.currentUser && Firebase.auth.currentUser.emailVerified;
        dispatch({
            type: VERIFY_EMAIL,
            value
        })
    }
}

export const setIsLoggedInToTrue = () => {
    return async dispatch => {
        dispatch({
            type: SET_IS_LOGGED_IN_TO_TRUE,
        });
    };
};

export const signUp = (email, password, userType) => {
    return async dispatch => {
        Firebase.auth
            .createUserWithEmailAndPassword(email, password)
            .then(async userData => {
                const userId = userData.user.uid;
                Firebase.auth.currentUser.getIdToken().then(token => {
                    saveUserDataToStorage(token, userId);
                });

                const ref = Firebase.database.ref(userType).child(userId);
                ref.child('userId').set(userId);
                ref.child('email').set(email);

                userData.user.sendEmailVerification().catch(error => {
                    throw error;
                });

                dispatch({
                    type: SIGN_UP,
                    userId: userData.user.uid,
                    token,
                    userType,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const logIn = (email, password) => {
    return async dispatch => {
        Firebase.auth
            .signInWithEmailAndPassword(email, password)
            .then(userData => {
                if (userData.user.emailVerified) {
                    dispatch({
                        type: LOG_IN,
                    });
                    Firebase.auth.currentUser.getIdToken().then(token => {
                        saveUserDataToStorage(token, userData.user.uid);
                    });
                } else {
                    dispatch({
                        type: LOG_IN,
                        userId: userData.user.uid,
                        token,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const autoLogIn = () => {
    return async dispatch => {
        var isLoggedIn, userId, token;
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            isLoggedIn = true;
            userId = JSON.parse(userData).userId;
            token = JSON.parse(userData).token;
        } else {
            isLoggedIn = false;
            userId = null;
            token = null;
        }
        const bla = JSON.parse(userData);
        dispatch({
            type: AUTO_LOG_IN,
            userId,
            token,
            isLoggedIn,
        });
    };
};

export const signOut = () => {
    return async dispatch => {
        Firebase.auth
            .signOut()
            .then(() => {
                // Sign-out successful.
            })
            .catch(error => {
                // An error happened.
            });
        await AsyncStorage.removeItem('userData');
        dispatch({
            type: SIGN_OUT,
        });
    };
};
