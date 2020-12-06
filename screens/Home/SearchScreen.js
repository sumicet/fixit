import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';

import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Line from '../../components/common/Line';
import SmallContent from '../../components/text/SmallContent';
import Touchable from '../../components/common/Touchable';
import { List } from 'react-native-paper';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import Header from '../../components/text/Header';
import Dropdown from '../../components/dropdown/Dropdown';
import Rating from '../../components/cards/Tradesperson/Rating';
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
        <ScrollableContainer style={{ paddingTop: 0 }}>
            <Line
                style={{
                    flex: 0,
                    alignItems: 'flex-start',
                }}
            >
                <Header>Search filters</Header>
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
                    }}
                >
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
                                                ? Color.textField
                                                : Color.secondaryColor,
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
                        color: Color.textColor,
                        fontFamily: 'Asap-Regular',
                        fontSize: Layout.smallContentSize,
                    }}
                    checkedColor={Color.primaryBrandColor}
                    uncheckedColor={Color.textColor}
                    title="Security liability insurance"
                />
            </Line>
            {/* flex: 0,
                    justifyContent: 'flex-start', */}

            {/* <View style={{ alignItems: 'flex-start' }}>
                <View style={{ paddingBottom: Layout.generalPadding }}>
                    <Header>Tradesperson</Header>
                </View>
                <View
                    style={{
                        marginBottom: Layout.screenVerticalPadding,
                        backgroundColor: Color.textField,
                        borderRadius: Layout.borderRadius,
                        overflow: 'hidden',
                        width: '100%',
                    }}
                >
                    <List.Accordion
                        title={title}
                        expanded={expanded}
                        titleStyle={{
                            color: Color.primaryColor,
                            fontSize: Layout.smallContentSize,
                            fontFamily: 'Asap-SemiBold',
                        }}
                        style={{
                            paddingVertical: 2,
                            backgroundColor: Color.primaryBrandColor,
                            borderTopLeftRadius: Layout.borderRadius,
                            borderTopRightRadius: Layout.borderRadius,
                            borderBottomRightRadius: expanded
                                ? 0
                                : Layout.borderRadius,
                            borderBottomLeftRadius: expanded
                                ? 0
                                : Layout.borderRadius,
                        }}
                        onPress={() => setExpanded(!expanded)}
                        //left={props => <List.Icon {...props} icon="folder" />}
                    >
                        <List.Item
                            onPress={() => {
                                setExpanded(false);
                                setTitle('All');
                            }}
                            title="All"
                            titleStyle={{
                                color: Color.textColor,
                                fontSize: Layout.smallContentSize,
                                fontFamily: 'Asap-Regular',
                            }}
                            style={{
                                paddingVertical: 2,
                                backgroundColor: Color.textField,
                            }}
                        />
                        {OCCUPATIONS.map(item => (
                            <List.Item
                                onPress={() => {
                                    setExpanded(false);
                                    setTitle(item.name);
                                }}
                                title={item.name}
                                titleStyle={{
                                    color: Color.textColor,
                                    fontSize: Layout.smallContentSize,
                                    fontFamily: 'Asap-Regular',
                                }}
                                style={{
                                    paddingVertical: 2,
                                    backgroundColor: Color.textField,
                                }}
                            />
                        ))}
                    </List.Accordion>
                </View>
            </View> */}

            {/* <View
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
                                    colorItemAt(index, Color.primaryBrandColor);
                                    console.log(index);
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
                                        fontFamily: 'Asap-Regular',
                                        color: Color.primaryColor,
                                    }}
                                >
                                    {item.selection}
                                </SmallContent>
                            </Touchable>
                        </Line>
                    );
                })}
            </View> */}
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default SearchScreen;
