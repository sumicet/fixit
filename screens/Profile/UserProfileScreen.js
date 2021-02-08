import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../../components/text/SmallContent';
import Touchable from '../../components/common/Touchable';
import Container from '../../components/containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import Line from '../../components/common/Line';
import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
import MediumButton from '../../components/buttons/MediumButtom';
import {
    addDummyTradespeople,
    addDummyCustomers,
    signOut,
    addDummyJobs,
    addDummyReviews,
} from '../../store/actions/auth';
import ProfileField from '../../components/layout/ProfileField';
import LineDescription from '../../components/common/LineDescription';
import { setInAppNotification } from '../../store/actions/ui';
import { SUCCESS } from '../../constants/Actions';
import Loading from '../../components/loading/Loading';
import { coloredHeaderOptions } from '../../navigation/options/HeaderOptions';

const UserProfileScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state => state.auth.userId);
    const name = useSelector(state => state.auth.name);
    const email = useSelector(state => state.auth.email);
    const userType = useSelector(state => state.auth.userType);

    const tradesperson = useSelector(state => state.tradesperson);

    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        props.navigation.setOptions({
            ...coloredHeaderOptions,
            headerTitle: name,
            headerStyle: {
                ...coloredHeaderOptions.headerStyle,
                backgroundColor:
                    userType === 'tradesperson'
                        ? Color.secondaryBrandColor
                        : Color.primaryColor,
            },
        });
        setIsLoading(false);
    }, [name]);

    useEffect(() => {
        if (
            isFocused &&
            props.route.params &&
            props.route.params.action === 'password-reset'
        ) {
            dispatch(
                setInAppNotification(
                    'Changes saved!',
                    'You password has been successfully updated.',
                    SUCCESS
                )
            );
        }
    }, [props, isFocused]);

    if (isLoading) {
        return (
            <Loading
                spinnerColor={Color.textOnTertiaryColorBackground}
                style={{ backgroundColor: Color.secondaryBrandColor }}
            />
        );
    }

    return (
        <Container
            style={{ marginTop: 0, paddingTop: 0, paddingHorizontal: 0 }}
        >
            <View style={{ flex: 1 }}>
                {userType === 'tradesperson' && (
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
                                props.navigation.navigate(
                                    'TradespersonProfile',
                                    {
                                        tradespersonId: userId,
                                    }
                                );
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
                                    isLarge={true}
                                    isRateCard={true}
                                />
                            </Line>
                            <Line style={{ flex: 0 }}>
                                <SmallContent
                                    style={{
                                        color:
                                            Color.textOnTertiaryColorBackground,
                                        textAlign: 'center',
                                    }}
                                >
                                    Check how customers see your profile.
                                </SmallContent>
                            </Line>
                        </Touchable>
                    </View>
                )}
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: Layout.screenHorizontalPadding,
                        paddingTop:
                            userType === 'tradesperson'
                                ? Layout.screenHorizontalPadding
                                : 0,
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
                        value={name}
                        onPress={() => {
                            props.navigation.navigate('ChangeName');
                        }}
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
                            dispatch(signOut()).then(() => {
                                props.navigation.dispatch(
                                    CommonActions.reset({
                                        index: 1,
                                        routes: [
                                            {
                                                name: 'LogIn',
                                            },
                                        ],
                                    })
                                );
                            });
                        }}
                    />
                </View>
                {/* <Line
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
                                    '4',
                                    'email4@gmail.com',
                                    'Grogu',
                                    [1, 2, 5, 6, 7],
                                    {
                                        line1:
                                            'Ateneul Român, Strada Benjamin Franklin, Bucharest, Romania',
                                        place_id: 'ChIJl3ltbk__sUAR8nZ44F-vc1o',
                                    },
                                    3,
                                    true,
                                    [1, 2, 3],
                                    '9999999999'
                                )
                            );
                            dispatch(
                                addDummyTradespeople(
                                    '5',
                                    'email5@gmail.com',
                                    'Giancarlo Esposito',
                                    [8, 9],
                                    {
                                        line1:
                                            'Aerodromul Clinceni, Clinceni, Romania',
                                        place_id: 'ChIJDUtYq_f-rUAR96Qh-AiKVQM',
                                    },
                                    1,
                                    false,
                                    [3],
                                    '8888888888'
                                )
                            );
                            dispatch(
                                addDummyTradespeople(
                                    '6',
                                    'email6@gmail.com',
                                    'Katee Sackhoff',
                                    [9, 10],
                                    {
                                        line1:
                                            'Ministerul Apărării Naționale, Strada Izvor, Bucharest, Romania',
                                        place_id: 'ChIJkc2pdGX_sUARVU5Qzth4TpI',
                                    },
                                    1,
                                    false,
                                    [1, 2, 3],
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
                        text="[dev only] +customers"
                        onPress={() => {
                            dispatch(
                                addDummyCustomers(
                                    '1',
                                    'email1c@gmail.com',
                                    'Natalie Portman'
                                )
                            );
                            dispatch(
                                addDummyCustomers(
                                    '2',
                                    'email2c@gmail.com',
                                    'Ray Park'
                                )
                            );
                            dispatch(
                                addDummyCustomers(
                                    '3',
                                    'email3c@gmail.com',
                                    'Hayden Christensen'
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
                        text="[dev only] +jobs"
                        onPress={() => {
                            dispatch(
                                addDummyJobs(
                                    '1',
                                    9,
                                    3,
                                    'Viverra justo nec ultrices dui sapien. Sagittis aliquam malesuada bibendum arcu. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Cursus in hac habitasse platea dictumst quisque sagittis purus sit. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Arcu cursus vitae congue mauris rhoncus aenean vel. Lacinia quis vel eros donec ac odio. In mollis nunc sed id. Enim tortor at auctor urna nunc id cursus.',
                                    1,
                                    3,
                                    {
                                        line1:
                                            'Regina Maria Floreasca, Strada Axinte Uricariul, Bucharest, Romania',
                                        place_id: 'ChIJrQ3WHqz4sUARKNh4a0xOjlE',
                                        line2: 'Congue quisque egestas diam.'
                                    },
                                    5
                                )
                            );
                            dispatch(
                                addDummyJobs(
                                    '2',
                                    4,
                                    6,
                                    'Malesuada fames ac turpis egestas sed. Diam in arcu cursus euismod quis. Id diam maecenas ultricies mi eget mauris pharetra. Et sollicitudin ac orci phasellus egestas. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Porttitor rhoncus dolor purus non enim praesent elementum facilisis.',
                                    2,
                                    1,
                                    {
                                        line1:
                                            'ionut&roberta impex srl, Gorneni, Romania',
                                        place_id: 'ChIJb6YeJIX9rUARBPcAUdsZ-7M',
                                        line2: 'Congue quisque egestas diam.'
                                    },
                                    3
                                )
                            );
                            dispatch(
                                addDummyJobs(
                                    '1',
                                    3,
                                    3,
                                    'Amet nulla facilisi morbi tempus iaculis urna id volutpat. A diam maecenas sed enim ut sem. Viverra accumsan in nisl nisi scelerisque eu. ',
                                    2,
                                    3,
                                    {
                                        line1:
                                            'Super Market Aly-Mark Best Com, DN4, Frumușani, Romania',
                                        place_id: 'ChIJwydUwN8drkARlbtgJBoxQ9Y',
                                        line2: 'Congue quisque egestas diam.'
                                    },
                                    4
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
                        text="[dev only] +reviews"
                        onPress={() => {
                            dispatch(
                                addDummyReviews(
                                    '1',
                                    '1',
                                    4,
                                    'Donec euismod tristique sem non tempus. Phasellus scelerisque elit a efficitur dignissim.'
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '1',
                                    '2',
                                    5,
                                    'Interdum et malesuada fames ac ante ipsum primis in faucibus.',
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '1',
                                    '3',
                                    5,
                                    'Quisque ac velit quam.',
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '1',
                                    '4',
                                    5,
                                    'Sed eget mattis velit.'
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '1',
                                    '5',
                                    5,
                                    'Donec purus lorem, imperdiet at massa id, molestie sodales sem.',
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '1',
                                    '6',
                                    1,
                                    'Sed a felis ullamcorper, gravida tortor in, rhoncus lacus.',
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '2',
                                    '1',
                                    5,
                                    'Donec et quam molestie, tincidunt ex ut, consectetur leo.'
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '2',
                                    '2',
                                    4,
                                    'Suspendisse et ullamcorper nibh, sit amet auctor eros.',
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '2',
                                    '3',
                                    5,
                                    'Phasellus hendrerit lacus vel convallis laoreet.',
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '2',
                                    '4',
                                    5,
                                    'Nulla facilisi.'
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '2',
                                    '5',
                                    2,
                                    'Morbi non magna nisl.',
                                )
                            );
                            dispatch(
                                addDummyReviews(
                                    '2',
                                    '6',
                                    4,
                                    'Nam fermentum, mi accumsan feugiat aliquet, ex tortor gravida felis, eget vestibulum est erat sed orci.',
                                )
                            );
                        }}
                        style={{ backgroundColor: Color.textField }}
                        textColor={Color.secondaryColor}
                    />
                </Line> */}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default UserProfileScreen;
