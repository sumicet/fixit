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
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const RESEND_EMAIL_TIMER = 'RESEND_EMAIL_TIMER';

export const changeEmail = (email) => {
    return async (dispatch, getState) => {
        const userType = getState().auth.userType;
        const userId = getState().auth.userId;
        Firebase.auth.currentUser.updateEmail(email);
        const ref = Firebase.database.ref(userType).child(userId);
        ref.child('email').set(email);
        dispatch({
            type: CHANGE_EMAIL,
            email
        })
    }
}

const saveUserDataToStorage = (token, userId) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
        })
    );
};

export const setResendEmailTimer = date => {
    return async dispatch => {
        dispatch({
            type: RESEND_EMAIL_TIMER,
            date,
        });
    };
};

export const updateToken = token => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        saveUserDataToStorage(userId, token);
        dispatch({
            type: UPDATE_TOKEN,
            token,
        });
    };
};

export const verifyEmail = () => {
    return async dispatch => {
        const value =
            Firebase.auth.currentUser &&
            Firebase.auth.currentUser.emailVerified;
        dispatch({
            type: VERIFY_EMAIL,
            value,
        });
    };
};

export const setIsLoggedInToTrue = () => {
    return async dispatch => {
        dispatch({
            type: SET_IS_LOGGED_IN_TO_TRUE,
        });
    };
};

export const addDummyTradespeople = (
    userId,
    email,
    name,
    occupationsIds,
    streetAddress,
    experienceId,
    insurance,
    propertyTypesIds,
    phoneNumber
) => {
    return async dispatch => {
        const ref = Firebase.database.ref('tradesperson').child(userId);
        ref.child('userId').set(userId);
        ref.child('email').set(email);
        ref.child('recommendedByIds').set([]);
        ref.child('rating').set(null);
        ref.child('ratingVotesAmount').set(null);
        ref.child('contactsIds').set([]);
        ref.child('name').set(name);
        ref.child('occupationsIds').set(occupationsIds);
        ref.child('streetAddress').set(streetAddress);
        ref.child('experienceId').set(experienceId);
        ref.child('insurance').set(insurance);
        ref.child('propertyTypesIds').set(propertyTypesIds);
        ref.child('phoneNumber').set(phoneNumber);
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
                ref.child('recommendedByIds').set([]);
                ref.child('rating').set(null);
                ref.child('ratingVotesAmount').set(null);
                ref.child('contactsIds').set([]);

                userData.user.sendEmailVerification().catch(error => {
                    throw error;
                });

                dispatch({
                    type: SIGN_UP,
                    userId: userData.user.uid,
                    token,
                    userType,
                    email,
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
                        type: SET_IS_LOGGED_IN_TO_TRUE,
                    });
                    Firebase.auth.currentUser.getIdToken().then(token => {
                        saveUserDataToStorage(token, userData.user.uid);
                    });
                } else {
                    dispatch({
                        type: LOG_IN,
                        userId: userData.user.uid,
                        token,
                        email,
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
        var ref;
        try {
            ref = Firebase.database.ref('tradesperson').child(userId);
        } catch (error) {
            ref = Firebase.database.ref('customer').child(userId);
        }

        const snap = await ref.child('email').once('value');
        const email = snap.val();

        dispatch({
            type: AUTO_LOG_IN,
            userId,
            token,
            isLoggedIn,
            email,
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
