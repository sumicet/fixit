import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Touchable from '../common/Touchable';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Line from '../common/Line';
import Title from '../text/Title';
import Header from '../text/Header';
import SmallContent from '../text/SmallContent';

const ServiceCard = props => {
    return (
        <Touchable
            onPress={props.onPress}
            style={[
                {
                    flex: 0,
                },
                props.style,
            ]}
            isCard={true}
        >
            <LinearGradient
                style={{
                    flex: 0,
                    paddingHorizontal: Layout.screenHorizontalPadding,
                    paddingTop: Layout.screenHorizontalPadding,
                    paddingBottom: Layout.generalMargin,
                    borderRadius: Layout.borderRadius,
                }}
                colors={[props.color, Color.tertiaryBrandColor]}
                start={[0, 0]}
                end={[1, 1]}
                locations={[0, 0.7]}
            >
                <View>
                    <View>
                        <Line
                            style={{
                                alignItems: 'flex-start',
                                flex: 0,
                            }}
                        >
                            <Title style={{ color: Color.importantTextOnTertiaryColorBackground}}>
                                {props.title}
                            </Title>
                        </Line>
                        <Line
                            style={{
                                alignItems: 'flex-start',
                                flex: 0,
                                paddingBottom: 5,
                            }}
                        >
                            <SmallContent style={{ color: Color.importantTextOnTertiaryColorBackground }}>
                                {props.perkOne}
                            </SmallContent>
                        </Line>
                        <Line
                            style={{
                                alignItems: 'flex-start',
                                flex: 0,
                            }}
                        >
                            <SmallContent style={{ color: Color.importantTextOnTertiaryColorBackground }}>
                                {props.perkTwo}
                            </SmallContent>
                        </Line>
                        <Line
                            style={{
                                alignItems: 'flex-start',
                                flex: 0,
                            }}
                        >
                            <Header style={{ color: Color.importantTextOnTertiaryColorBackground }}>
                                {props.price}
                            </Header>
                        </Line>
                    </View>
                </View>
            </LinearGradient>
        </Touchable>
    );
};

const styles = StyleSheet.create({});

export default ServiceCard;
