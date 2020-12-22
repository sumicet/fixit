import React from 'react';
import { LayoutAnimation } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Line from '../common/Line';
import Touchable from '../common/Touchable';
import Header from '../text/Header';

const ProfileField = props => {
    return (
        <Touchable style={{ flex: 0 }} onPress={props.onPress}>
            <Line
                style={{
                    width: '100%',
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
            >
                <View>
                    <Header
                        style={{
                            textAlign: 'left',
                        }}
                    >
                        {props.description}
                    </Header>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Header
                            style={{
                                fontFamily: 'Asap-Regular',
                                textAlign: 'left',
                            }}
                        >
                            {props.value}
                        </Header>
                        <View style={{ paddingLeft: Layout.generalMargin }}>
                            <Icon
                                name="right"
                                size={Layout.cardIconSize}
                                color={Color.textOnTertiaryColorBackground}
                            />
                        </View>
                    </View>
                </View>
            </Line>
        </Touchable>
    );
};

const styles = StyleSheet.create({});

export default ProfileField;
