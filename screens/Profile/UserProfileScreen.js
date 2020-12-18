import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../../components/text/SmallContent';
import Header from '../../components/text/Header';
import HeaderWithEllipsis from '../../components/text/HeaderWithEllipsis';
import Touchable from '../../components/common/Touchable';
import Waves from '../../assets/icons/Background/Waves';
import Container from '../../components/containers/Container';
import { useDispatch } from 'react-redux';
import { setStatusBarStyle } from '../../store/actions/ui';
import Title from '../../components/text/Title';
import Line from '../../components/common/Line';
import InAppNotification from '../../components/alert/InAppNotification';
import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
import MediumButton from '../../components/buttons/MediumButtom';
import { signOut } from '../../store/actions/auth';

const UserProfileScreen = props => {
    class ProfileData {
        constructor(id, value, description, onChange, onPress) {
            this.id = id;
            this.value = value;
            this.description = description;
        }
    }

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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(setStatusBarStyle('light'));
        });

        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            dispatch(setStatusBarStyle('light'));
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <Container
            style={{ marginTop: 0, paddingTop: 0, paddingHorizontal: 0 }}
        >
            <View style={{ flex: 1 }}>
                <Waves />
                <Touchable
                    onPress={() => {
                        props.navigation.navigate('TradespersonProfile');
                    }}
                    style={{
                        flex: 0,
                        height: 200,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: StatusBar.currentHeight,
                        padding: Layout.screenVerticalPadding,
                    }}
                    isCard={true}
                >
                    {/* <Title style={{ color: Color.importantTextOnTertiaryColorBackground }}>
                        Premium Fixit
                    </Title>
                    <SmallContent
                        style={{
                            color: Color.textOnTertiaryColorBackground,
                            textAlign: 'center',
                        }}
                    >
                        Join now to unlock unlimited daily quotes,
                        recommendations and much more.
                    </SmallContent> */}

                    <Line style={{ flex: 0 }}>
                        <Title
                            style={{
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                        >
                            John McCornmack
                        </Title>
                    </Line>
                    <Line style={{ flex: 0 }}>
                        <ProfilePicture />
                    </Line>
                    <Line style={{ flex: 0 }}>
                        <SmallContent
                            style={{
                                color: Color.textOnTertiaryColorBackground,
                                textAlign: 'center',
                            }}
                        >
                            See your tradesperson profile.
                        </SmallContent>
                    </Line>
                </Touchable>
                <View
                    style={{
                        marginTop: Layout.screenVerticalPadding,
                        flex: 1,
                        paddingTop: Layout.screenVerticalPadding,
                        paddingHorizontal: Layout.screenHorizontalPadding,
                    }}
                >
                    <Line
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginTop: Layout.screenHorizontalPadding, //added after
                        }}
                    >
                        <View
                            style={{
                                marginBottom: Layout.generalPadding,
                                flexDirection: 'row',
                            }}
                        >
                            <Header
                                style={{
                                    color:
                                        Color.importantTextOnTertiaryColorBackground,
                                }}
                            >
                                ACCOUNT SETTINGS
                            </Header>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Touchable
                                    style={{ flex: 0 }}
                                    onPress={() => {
                                        props.navigation.navigate(
                                            'ResetEmailOrPassword',
                                            {
                                                screen: 'SelectOption',
                                            }
                                        );
                                    }}
                                >
                                    <Icon
                                        name="pencil"
                                        color={
                                            Color.importantTextOnTertiaryColorBackground
                                        }
                                        size={Layout.menuIconSize}
                                    />
                                </Touchable>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: Layout.generalPadding,
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    marginRight: Layout.screenHorizontalPadding,
                                    alignItems: 'flex-end',
                                }}
                            >
                                <View
                                    style={{
                                        marginBottom: Layout.generalPadding,
                                    }}
                                >
                                    <Header
                                        style={{
                                            fontFamily: 'Asap-Regular',
                                            textAlign: 'left',
                                        }}
                                    >
                                        Email address:{' '}
                                    </Header>
                                </View>
                                <View
                                    style={{
                                        marginBottom: Layout.generalPadding,
                                    }}
                                >
                                    <Header
                                        style={{
                                            fontFamily: 'Asap-Regular',
                                            textAlign: 'left',
                                        }}
                                    >
                                        Password:{' '}
                                    </Header>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        marginBottom: Layout.generalPadding,
                                    }}
                                >
                                    <HeaderWithEllipsis
                                        style={{
                                            fontFamily: 'Asap-Regular',
                                            textAlign: 'left',
                                        }}
                                    >
                                        johnmccormack@gmail.com
                                    </HeaderWithEllipsis>
                                </View>
                                <View
                                    style={{
                                        marginBottom: Layout.generalPadding,
                                    }}
                                >
                                    <HeaderWithEllipsis
                                        style={{
                                            fontFamily: 'Asap-Regular',
                                            textAlign: 'left',
                                        }}
                                    >
                                        ***************
                                    </HeaderWithEllipsis>
                                </View>
                            </View>
                        </View>
                    </Line>
                    <Line
                        style={{
                            flex: 0,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <MediumButton
                            text="Sign out"
                            onPress={() => {
                                dispatch(signOut());
                            }}
                            style={{ backgroundColor: Color.textField }}
                            textColor={Color.secondaryColor}
                        />
                    </Line>
                </View>
            </View>
            <InAppNotification
                title={inAppNotificationBody.title}
                message={inAppNotificationBody.message}
                inAppNotificationVisible={inAppNotificationVisible}
                hide={handleHideInAppNotification}
            />
        </Container>
    );
};

const styles = StyleSheet.create({});

export default UserProfileScreen;
