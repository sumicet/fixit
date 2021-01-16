import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../../components/text/SmallContent';
import Header from '../../components/text/Header';
import HeaderWithEllipsis from '../../components/text/HeaderWithEllipsis';
import Touchable from '../../components/common/Touchable';
import Waves from '../../assets/icons/Background/Waves';
import Container from '../../components/containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/text/Title';
import Line from '../../components/common/Line';
import InAppNotification from '../../components/alert/InAppNotification';
import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
import MediumButton from '../../components/buttons/MediumButtom';
import { addDummyTradespeople, signOut } from '../../store/actions/auth';
import { fetchTradespersonInfo } from '../../store/actions/tradesperson';
import * as Firebase from '../../config/Firebase';
import ProfileField from '../../components/layout/ProfileField';
import LineDescription from '../../components/common/LineDescription';
import { setInAppNotification } from '../../store/actions/ui';
import { ERROR, SUCCESS } from '../../constants/Actions';

const UserProfileScreen = props => {
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {
        if (userId) {
            dispatch(fetchTradespersonInfo(Firebase.auth.currentUser.uid)).then(
                () => {
                    props.navigation.setOptions({
                        headerTitle: tradesperson.name,
                    });
                }
            );
        }
    }, []);

    const tradesperson = useSelector(state => state.tradesperson);

    const email = useSelector(state => state.auth.email);

    const isFocused = useIsFocused();

    const [inAppNotificationVisible, setInAppNotificationVisible] = useState(
        false
    );
    const [inAppNotificationBody, setInAppNotificationBody] = useState({
        title: null,
        message: null,
    });

    const handleHideInAppNotification = () => {
        setInAppNotificationVisible(false);
    };

    const closeInAppNotificationAfterTimerExpires = async () => {
        setTimeout(() => {
            handleHideInAppNotification();
        }, 5000);
    };

    useEffect(() => {
        if (
            isFocused &&
            props.route.params &&
            props.route.params.action === 'password-reset'
        ) {
            // TODO fetch email and password
            setInAppNotificationBody({
                title: 'Success',
                message: 'Your password was successfully updated.',
            });
            setInAppNotificationVisible(true);
            closeInAppNotificationAfterTimerExpires();
        }
    }, [props, isFocused]);

    const dispatch = useDispatch();

    return (
        <Container
            style={{ marginTop: 0, paddingTop: 0, paddingHorizontal: 0 }}
        >
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: Color.secondaryBrandColor,
                        borderBottomLeftRadius: Layout.borderRadius,
                        borderBottomRightRadius: Layout.borderRadius,
                        overflow: 'hidden',
                    }}
                >
                    <Touchable
                        onPress={() => {
                            props.navigation.navigate('TradespersonProfile', {
                                userId,
                            });
                        }}
                        style={{
                            flex: 0,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: Layout.screenVerticalPadding,
                        }}
                        isCard={true}
                    >
                        <Line style={{ flex: 0 }}>
                            <ProfilePicture
                                profilePicture={tradesperson.profilePicture}
                            />
                        </Line>
                        <Line style={{ flex: 0 }}>
                            <SmallContent
                                style={{
                                    color: Color.textOnTertiaryColorBackground,
                                    textAlign: 'center',
                                }}
                            >
                                Check how customers see your profile.
                            </SmallContent>
                        </Line>
                    </Touchable>
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: Layout.screenHorizontalPadding,
                        paddingTop: Layout.screenHorizontalPadding,
                    }}
                >
                    <LineDescription
                        text="User settings"
                        textStyle={{
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    />
                    <ProfileField
                        description="Email"
                        value={email}
                        onPress={() => {
                            props.navigation.navigate('RelogUser', {
                                action: 'change_email',
                            });
                        }}
                    />
                    <ProfileField
                        description="Name"
                        value={tradesperson.name}
                        onPress={() => {}}
                    />
                    <LineDescription
                        text="Security"
                        textStyle={{
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    />
                    <ProfileField
                        description="Change password"
                        onPress={() => {
                            props.navigation.navigate('RelogUser', {
                                action: 'change_password',
                            });
                        }}
                    />
                    <LineDescription
                        text="Session"
                        textStyle={{
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    />
                    <ProfileField
                        description="Sign out"
                        onPress={() => {
                            dispatch(signOut());
                        }}
                    />
                </View>
                <Line
                    style={{
                        flex: 0,
                        justifyContent: 'flex-end',
                    }}
                >
                    <MediumButton
                        text="[dev only] +tradespeople"
                        onPress={() => {
                            dispatch(
                                addDummyTradespeople(
                                    '1',
                                    'email1@gmail.com',
                                    'Name1',
                                    [1, 4],
                                    {
                                        line1:
                                            'Financial Center Street, Along Sheikh Zayed Road, Next to Burj Khalifa - وسط مدينة دبي - دبي - United Arab Emirates',
                                        place_id: 'ChIJB1zIKShoXz4RnbaTPPup7aU',
                                    },
                                    2,
                                    true,
                                    [1, 3],
                                    '0757570851'
                                )
                            );
                            dispatch(
                                addDummyTradespeople(
                                    '2',
                                    'email2@gmail.com',
                                    'Name2',
                                    [2, 3],
                                    {
                                        line1:
                                            'Financial Center Street, Along Sheikh Zayed Road, Next to Burj Khalifa - وسط مدينة دبي - دبي - United Arab Emirates',
                                        place_id: 'ChIJB1zIKShoXz4RnbaTPPup7aU',
                                    },
                                    3,
                                    true,
                                    [2, 3],
                                    '0757570851'
                                )
                            );
                            dispatch(
                                addDummyTradespeople(
                                    '3',
                                    'email3@gmail.com',
                                    'Name3',
                                    [3, 4],
                                    {
                                        line1:
                                            'Financial Center Street, Along Sheikh Zayed Road, Next to Burj Khalifa - وسط مدينة دبي - دبي - United Arab Emirates',
                                        place_id: 'ChIJB1zIKShoXz4RnbaTPPup7aU',
                                    },
                                    2,
                                    true,
                                    [1, 3],
                                    '0757570851'
                                )
                            );
                        }}
                        style={{ backgroundColor: Color.textField }}
                        textColor={Color.secondaryColor}
                    />
                </Line>
                <Line
                    style={{
                        flex: 0,
                        justifyContent: 'flex-end',
                    }}
                >
                    <MediumButton
                        text="[dev only] alert test"
                        onPress={() => {
                            dispatch(
                                setInAppNotification(
                                    'Success!',
                                    'You leveled up!',
                                    ERROR
                                )
                            );
                        }}
                        style={{ backgroundColor: Color.textField }}
                        textColor={Color.secondaryColor}
                    />
                </Line>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default UserProfileScreen;
