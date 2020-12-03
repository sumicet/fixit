import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
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
                message: 'Your password was updated.',
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
            dispatch(setStatusBarStyle('dark'));
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
                    onPress={() => {}}
                    style={{
                        flex: 0,
                        height: 150,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: StatusBar.currentHeight,
                        padding: Layout.screenVerticalPadding,
                    }}
                    isCard={true}
                >
                    <Title style={{ color: Color.primaryBrandColor }}>
                        Premium Fixit
                    </Title>
                    <SmallContent
                        style={{
                            color: Color.primaryColor,
                            textAlign: 'center',
                        }}
                    >
                        Join now to unlock unlimited daily quotes,
                        recommendations and much more.
                    </SmallContent>
                </Touchable>
                <View
                    style={{
                        marginTop: Layout.screenVerticalPadding,
                        flex: 1,
                        paddingTop: Layout.screenVerticalPadding,
                        paddingHorizontal: Layout.screenHorizontalPadding,
                    }}
                >
                    <Touchable
                        style={{
                            flex: 0,
                            borderRadius: Layout.borderRadius,
                            backgroundColor: Color.primaryBrandColor,
                            padding: Layout.screenHorizontalPadding,
                            marginTop: Layout.screenHorizontalPadding,
                            marginBottom: Layout.screenHorizontalPadding * 2,
                        }}
                        onPress={() => {
                            props.navigation.navigate('Profile', {
                                screen: 'TradespersonProfile',
                                params: { action: 'edit' },
                            });
                        }}
                        isCard={true}
                    >
                        <Header style={{ color: Color.primaryColor }}>
                            My Tradesperson Profile
                        </Header>
                    </Touchable>
                    <Line
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <View
                            style={{
                                marginBottom: Layout.generalPadding,
                                flexDirection: 'row',
                            }}
                        >
                            <Header>ACCOUNT SETTINGS</Header>
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
                                        color={Color.textColor}
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
