import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import Touchable from '../../components/common/Touchable';
import SmallContent from '../../components/text/SmallContent';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const Grid = props => {
    const [colors, setColors] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const initialColors = [];
            var i;
            for (i = 0; i < props.data.length; i++) {
                if (props.initialSelectedIndexes && props.initialSelectedIndexes.includes(i)) {
                    initialColors.push(Color.tertiaryBrandColor);
                } else {
                    initialColors.push(Color.textField);
                }
            }
            setColors(initialColors);
        }
    }, [props.data]);

    const handleItemPress = index => {
        const updatedColors = [...colors];
        updatedColors[index] = Color.tertiaryBrandColor;
        var i;
        for (i = 0; i < props.data.length; i++) {
            if (i !== index) {
                updatedColors[i] = Color.textField;
            }
        }
        setColors(updatedColors);
    };

    const handleMultipleOptionsItemPress = index => {
        const updatedColors = [...colors];
        updatedColors[index] =
            updatedColors[index] === Color.tertiaryBrandColor
                ? Color.textField
                : Color.tertiaryBrandColor;
        setColors(updatedColors);
    };

    const ItemContainer = props.RenderItemComponent ? View : Touchable;

    const RenderItem = props => {
        return (
            <ItemContainer
                onPress={() => {
                    if(props.multipleOptions) {
                        handleMultipleOptionsItemPress(props.index);
                    } else {
                        handleItemPress(props.index);
                    }
                    props.onPress(props.index);
                }}
                isCard={true}
                style={{
                    padding: Layout.generalPadding,
                    marginHorizontal: Layout.generalPadding / 2,
                    backgroundColor: colors[props.index],
                    borderRadius: Layout.borderRadius,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    height: 50,
                    marginBottom: Layout.generalPadding,
                }}
            >
                <SmallContent
                    style={{
                        color:
                            colors[props.index] === Color.tertiaryBrandColor
                                ? Color.importantTextOnTertiaryColorBackground
                                : Color.textColor,
                        fontFamily: 'SemiBold',
                        textAlign: 'center',
                    }}
                >
                    {props.text}
                </SmallContent>
            </ItemContainer>
        );
    };

    const RenderItemComponent = props.RenderItemComponent
        ? props.RenderItemComponent
        : RenderItem;

    return (
        <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '50%' }}>
                {props.data.map((item, index) => {
                    if (index > Math.ceil(props.data.length / 2) - 1) {
                        return null;
                    }
                    return (
                        <RenderItemComponent
                            text={item.name}
                            index={index}
                            onPress={props.onPress}
                            uncheckedColor={props.uncheckedColor}
                            {...props}
                        />
                    );
                })}
            </View>
            <View style={{ width: '50%' }}>
                {props.data.map((item, index) => {
                    if (index <= Math.ceil(props.data.length / 2) - 1) {
                        return null;
                    }
                    return (
                        <RenderItemComponent
                            text={item.name}
                            index={index}
                            onPress={props.onPress}
                            {...props}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Grid;
