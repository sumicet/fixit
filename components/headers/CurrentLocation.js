import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

import GoogleLocationIcon from '../../assets/icons/User/GoogleLocationIcon';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Line from '../common/Line';
import Touchable from '../common/Touchable';
import Header from '../text/Header';
import HeaderWithEllipsis from '../text/HeaderWithEllipsis';

const CurrentLocation = () => {

    const streetAddress = useSelector(state => state.auth.streetAddress);

    return (
        <Line
            style={{
                flex: 0,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: Layout.generalPadding,
            }}
        >
            <View>
                {/* <LocationIcon size={Layout.menuIconSize} /> */}
                <GoogleLocationIcon />
            </View>
            <Touchable
                style={{
                    flexDirection: 'row',
                    backgroundColor: Color.textField,
                    padding: Layout.screenHorizontalPadding,
                    borderRadius: Layout.borderRadius,
                    flex: 1,
                    marginLeft: Layout.generalPadding,
                }}
                onPress={() => {
                    props.navigation.navigate('HomeStackWithoutSearchBar', {
                        screen: 'CurrentLocation',
                    });
                }}
            >
                <View style={{ flex: 1 }}>
                    <Header
                        style={{
                            textAlign: 'left',
                            paddingBottom: 5,
                        }}
                    >
                        Where will the job be?
                    </Header>
                    <HeaderWithEllipsis
                        style={{
                            fontFamily: 'Regular',
                            color: Color.primaryBrandColor,
                        }}
                    >
                        {streetAddress && streetAddress.line1}
                    </HeaderWithEllipsis>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: Layout.generalPadding,
                    }}
                >
                    <Icon
                        name="right"
                        size={Layout.menuIconSize}
                        color={Color.secondaryColor}
                    />
                </View>
            </Touchable>
        </Line>
    );
};

export default CurrentLocation;