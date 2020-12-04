import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modal';

import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Line from '../../components/common/Line';
import SmallContent from '../../components/text/SmallContent';
import Touchable from '../../components/common/Touchable';
import { color } from 'react-native-reanimated';

const SearchScreen = props => {
    const [colors, setColors] = useState([
        Color.secondaryColor,
        Color.secondaryColor,
        Color.secondaryColor,
        Color.secondaryColor,
        Color.secondaryColor,
        Color.secondaryColor,
    ]);

    const colorItemAt = (index, color) => {
        const updatedColors = [...colors];
        updatedColors[index] = color;
        setColors(updatedColors);
    };

    const data = [
        {
            description: 'Job',
            selection: 'None',
        },
        {
            description: 'Work type',
            selection: 'None',
        },
        {
            description: 'Rating',
            selection: 'None',
        },
        {
            description: 'Experience',
            selection: 'None',
        },
        {
            description: 'Distance',
            selection: 'None',
        },
        {
            description: 'Liability insurance',
            selection: 'None',
        },
    ];

    return (
        <ScrollableContainer style={{ paddingTop: 0 }}>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    //alignItems: 'stretch',
                    //justifyContent: 'space-between',
                }}
            >
                {data.map((item, index) => {
                    return (
                        <Line
                            style={{
                                alignItems: 'flex-start',
                                justifyItems: 'flex-start',
                                flex: 0,
                            }}
                        >
                            <Touchable
                                onPress={() => {
                                    //props.navigation.navigate()
                                    colorItemAt(index, Color.primaryBrandColor)
                                    console.log(index)
                                }}
                                style={{
                                    flex: 0,
                                    borderRadius: Layout.borderRadius,
                                    backgroundColor: colors[index],
                                    padding: Layout.generalPadding,
                                    flexDirection: 'row',
                                    marginHorizontal: Layout.generalPadding / 2,
                                }}
                                isCard={true}
                            >
                                <SmallContent
                                    style={{ color: Color.primaryColor }}
                                >
                                    {item.description}:{' '}
                                </SmallContent>

                                <SmallContent
                                    style={{
                                        fontFamily: 'asap-regular',
                                        color: Color.primaryColor,
                                    }}
                                >
                                    {item.selection}
                                </SmallContent>
                            </Touchable>
                        </Line>
                    );
                })}
            </View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default SearchScreen;
