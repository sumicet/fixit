import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Firebase from '../../config/Firebase';
import * as firebase from 'firebase';
import { setInAppNotification } from './ui';
import { ERROR } from '../../constants/Actions';
import { CHANGE_TRADESPERSON_NAME } from './tradespeople';

export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const AUTO_LOG_IN = 'AUTO_LOG_IN';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_USER_TYPE = 'SET_USER_TYPE';
export const CHANGE_HAS_VERIFIED_EMAIL = 'CHANGE_HAS_VERIFIED_EMAIL';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const RESEND_EMAIL_TIMER = 'RESEND_EMAIL_TIMER';
export const SET_STREET_ADDRESS = 'SET_STREET_ADDRESS';
export const CHANGE_NAME = 'CHANGE_NAME';

export const changeName = (userId, name, userType) => {
    return async (dispatch, getState) => {
        const ref = Firebase.database.ref(userType).child(userId);
        ref.child('name').set(name);

        dispatch({
            type: CHANGE_NAME,
            name,
        });

        if(userType === 'tradesperson') {
            dispatch({
                type: CHANGE_TRADESPERSON_NAME,
                userId,
                name
            })
        }
    };
};

export const setStreetAddress = streetAddress => {
    return async dispatch => {
        dispatch({
            type: SET_STREET_ADDRESS,
            streetAddress,
        });
    };
};

export const changeEmail = (email, password) => {
    return async (dispatch, getState) => {
        const userType = getState().auth.userType;
        const userId = getState().auth.userId;
        await Firebase.auth.currentUser.updateEmail(email);
        await Firebase.auth.signInWithEmailAndPassword(email, password);
        const ref = Firebase.database.ref(userType).child(userId);

        ref.child('email').set(email);
        dispatch({
            type: CHANGE_EMAIL,
            email,
        });
    };
};

const saveUserDataToStorage = (userId, token) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            userId: userId,
            token: token,
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

export const updateToken = (userId, token) => {
    return async dispatch => {
        saveUserDataToStorage(userId, token);
        dispatch({
            type: UPDATE_TOKEN,
            token,
        });
    };
};

export const setIsLoggedIn = isLoggedIn => {
    return async dispatch => {
        dispatch({
            type: SET_IS_LOGGED_IN,
            isLoggedIn,
        });
    };
};

export const changeHasVerifiedEmail = hasVerifiedEmail => {
    return async dispatch => {
        dispatch({
            type: CHANGE_HAS_VERIFIED_EMAIL,
            hasVerifiedEmail,
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

export const signUp = (email, name, password, userType) => {
    return async dispatch => {
        try {
            const userData = await Firebase.auth.createUserWithEmailAndPassword(
                email,
                password
            );
            const userId = userData.user.uid;
            const token = await Firebase.auth.currentUser.getIdToken();
            saveUserDataToStorage(userId, token);
            const ref = Firebase.database.ref(userType).child(userId);
            ref.child('userId').set(userId);
            ref.child('email').set(email);
            ref.child('name').set(name);

            userData.user.sendEmailVerification().catch(error => {
                throw error;
            });

            dispatch({
                type: SIGN_UP,
                userId: userData.user.uid,
                token,
                userType,
                email,
                name,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const logIn = (email, password) => {
    return async dispatch => {
        try {
            const userData = await Firebase.auth.signInWithEmailAndPassword(
                email,
                password
            );
            const token = await userData.user.getIdToken();
            const userId = userData.user.uid;
            saveUserDataToStorage(userId, token);
            var ref, userType, name;
            try {
                ref = Firebase.database.ref('tradesperson').child(userId);
                userType = 'tradesperson';
            } catch (error) {
                ref = Firebase.database.ref('customer').child(userId);
                userType = 'customer';
            }
            ref.child('name')
                .once('value')
                .then(res => (name = res.val()));
            dispatch({
                type: LOG_IN,
                userId,
                token: token,
                userType,
                email,
                name,
            });
            dispatch({
                type: SET_IS_LOGGED_IN,
                isLoggedIn: true,
            });
            if (userData.user.emailVerified) {
                dispatch({
                    type: CHANGE_HAS_VERIFIED_EMAIL,
                    hasVerifiedEmail: true,
                });
            } else {
                dispatch({
                    type: CHANGE_HAS_VERIFIED_EMAIL,
                    hasVerifiedEmail: false,
                });
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/argument-error':
                    dispatch(
                        setInAppNotification(
                            'Empty fields',
                            'Please fill all the required fields.',
                            ERROR
                        )
                    );
                    return;
                case 'auth/too-many-requests':
                    dispatch(
                        setInAppNotification(
                            'Too many requests!',
                            'We have blocked all requests from this device due to unusual activity. Try again later.',
                            ERROR
                        )
                    );
                    return;
                case 'auth/invalid-email':
                    dispatch(
                        setInAppNotification(
                            'Invalid email',
                            'Please enter your email address in the following format: yourname@example.com',
                            ERROR
                        )
                    );
                    return;
                case 'auth/user-disabled':
                    dispatch(
                        setInAppNotification(
                            'User disabled',
                            'This user has been disabled.',
                            ERROR
                        )
                    );
                    return;
                case 'auth/user-not-found':
                    dispatch(
                        setInAppNotification(
                            'User not found',
                            "We couldn't find an account associated with this email address.",
                            ERROR
                        )
                    );
                    return;
                case 'auth/wrong-password':
                    dispatch(
                        setInAppNotification(
                            'Wrong password',
                            'It looks like the password does not match with the selected email address.',
                            ERROR
                        )
                    );
                    return;
                default:
                    dispatch(
                        setInAppNotification(
                            'Error!',
                            'A problem occured.',
                            ERROR
                        )
                    );
                    return;
            }
        }
        // Firebase.auth
        //     .signInWithEmailAndPassword(email, password)
        //     .then(userData => {
        //         userData.user.getIdToken().then(token => {
        //             const userId = userData.user.uid;
        //             saveUserDataToStorage(userId, token);
        //             var ref, userType;
        //             try {
        //                 ref = Firebase.database
        //                     .ref('tradesperson')
        //                     .child(userId);
        //                 userType = 'tradesperson';
        //             } catch (error) {
        //                 ref = Firebase.database.ref('customer').child(userId);
        //                 userType = 'customer';
        //             }
        //             dispatch({
        //                 type: LOG_IN,
        //                 userId,
        //                 token: token,
        //                 userType,
        //                 email,
        //             });
        //         });
        //         dispatch({
        //             type: SET_IS_LOGGED_IN,
        //             isLoggedIn: true,
        //         });
        //         if (userData.user.emailVerified) {
        //             dispatch({
        //                 type: CHANGE_HAS_VERIFIED_EMAIL,
        //                 hasVerifiedEmail: true,
        //             });
        //         } else {
        //             dispatch({
        //                 type: CHANGE_HAS_VERIFIED_EMAIL,
        //                 hasVerifiedEmail: false,
        //             });
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error, 'login');
        //     });
    };
};

export const autoLogIn = () => {
    return async dispatch => {
        const userData = await AsyncStorage.getItem('userData');
        const userId = userData && JSON.parse(userData).userId;
        const token = userData && JSON.parse(userData).token;

        if (userId && token) {
            var ref, userType, name;
            try {
                ref = Firebase.database.ref('tradesperson').child(userId);
                userType = 'tradesperson';
            } catch (error) {
                ref = Firebase.database.ref('customer').child(userId);
                userType = 'customer';
            }
            ref.child('name')
                .once('value')
                .then(res => (name = res.val()));

            const snap = await ref.child('email').once('value');
            const email = snap.val();

            dispatch({
                type: AUTO_LOG_IN,
                userId,
                token,
                email,
                userType,
                name,
            });
        }
    };
};

export const signOut = () => {
    return async dispatch => {
        await Firebase.auth.signOut().then(() => {
            AsyncStorage.removeItem('userData');
            dispatch({
                type: SIGN_OUT,
            });
        });
    };
};
