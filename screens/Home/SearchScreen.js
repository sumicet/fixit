import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';

import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Line from '../../components/common/Line';
import SmallContent from '../../components/text/SmallContent';
import Touchable from '../../components/common/Touchable';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import Header from '../../components/text/Header';
import Dropdown from '../../components/dropdown/Dropdown';
import { addFullStars } from '../../components/cards/Tradesperson/Rating';

const SearchScreen = props => {
    const [colors, setColors] = useState([
        Color.textField,
        Color.textField,
        Color.textField,
        Color.textField,
        Color.textField,
        Color.textField,
    ]);

    const stars = ['2.0', '2.5', '3.0', '3.5', '4.0', '4.5'];

    const colorItemAt = (index, color) => {
        const updatedColors = [...colors];
        updatedColors[index] = color;
        if (color === Color.primaryBrandColor) {
            var i;
            for (i = 0; i < updatedColors.length; i++) {
                if (i !== index) {
                    updatedColors[i] = Color.textField;
                }
            }
        }
        setColors(updatedColors);
    };

    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState(5);

    return (
        <ScrollableContainer>
            <Line
                style={{
                    flex: 0,
                    alignItems: 'flex-start',
                }}
            >
                <Header
                    style={{
                        color: Color.importantTextOnTertiaryColorBackground,
                    }}
                >
                    Search filters
                </Header>
            </Line>
            <Line
                style={{
                    flex: 0,
                    alignItems: 'flex-start',
                }}
            >
                <Dropdown
                    options={OCCUPATIONS.map(item => item.name)}
                    label="Tradesperson"
                    defaultValue="Show all"
                />
            </Line>
            <Line
                style={{
                    flex: 0,
                    alignItems: 'flex-start',
                }}
            >
                <Dropdown
                    options={[
                        'less than 10km',
                        'less than 15km',
                        'less than 20km',
                        'less than 30km',
                        'less than 50km',
                        'more than 50km',
                    ]}
                    label="Distance"
                    defaultValue="less than 30km"
                />
            </Line>
            <Line
                style={{
                    flex: 0,
                    width: '100%',
                    alignItems: 'flex-start',
                    paddingBottom:
                        Layout.screenHorizontalPadding - Layout.generalPadding,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: Layout.generalPadding,
                        }}
                    >
                        <SmallContent
                            style={{
                                color: Color.textOnTertiaryColorBackground,
                            }}
                        >
                            Rating:
                        </SmallContent>
                    </View>
                    {stars.map((value, index) => (
                        <Touchable
                            onPress={() => {
                                colorItemAt(
                                    index,
                                    colors[index] === Color.primaryBrandColor
                                        ? Color.textField
                                        : Color.primaryBrandColor
                                );
                            }}
                            style={{
                                flex: 0,
                                flexDirection: 'row',
                                borderRadius: Layout.borderRadius,
                                backgroundColor: colors[index],
                                padding: Layout.generalPadding,
                                paddingVertical: 2,
                                alignItems: 'center',
                                marginRight: Layout.generalPadding,
                                marginBottom: Layout.generalPadding,
                            }}
                            isCard={true}
                        >
                            <View style={{ paddingRight: 2 }}>
                                <SmallContent
                                    style={{
                                        color:
                                            colors[index] ===
                                            Color.primaryBrandColor
                                                ? Color.importantTextOnTertiaryColorBackground
                                                : Color.textOnTertiaryColorBackground,
                                    }}
                                >
                                    {value} +
                                </SmallContent>
                            </View>
                            {addFullStars(1)}
                        </Touchable>
                    ))}
                </View>
            </Line>
            <Line
                style={{
                    flex: 0,
                    alignItems: 'flex-start',
                }}
            >
                <CheckBox
                    title="Click Here"
                    checked={checked}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    containerStyle={{
                        backgroundColor: Color.primaryColor,
                        borderWidth: 0,
                        padding: 0,
                    }}
                    textStyle={{
                        color: Color.textOnTertiaryColorBackground,
                        fontFamily: 'SemiBold',
                        fontSize: Layout.smallContentSize,
                    }}
                    checkedColor={Color.primaryBrandColor}
                    uncheckedColor={Color.textOnTertiaryColorBackground}
                    title="Security liability insurance"
                />
            </Line>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default SearchScreen;
