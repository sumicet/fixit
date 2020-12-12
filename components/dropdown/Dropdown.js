import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ModalDropdown from '../../components/dropdown/ModalDropdown';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import SmallContent from '../text/SmallContent';

const Dropdown = props => {

    const [color, setColor] = useState(Color.textField);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            {props.label && <View style={{ paddingRight: Layout.generalPadding }}>
                <SmallContent style={{ color: Color.textOnTertiaryColorBackground }}>
                    {props.label}:
                </SmallContent>
            </View>}
            <ModalDropdown
                onSelect={() => {
                    setColor(Color.primaryBrandColor);
                }}
                isFullWidth={true}
                options={props.options}
                style={{
                    backgroundColor: color,
                    padding: Layout.generalPadding,
                    justifyContent: 'center',
                    borderWidth: 0,
                    width: 200,
                    borderRadius: Layout.borderRadius,
                }}
                textStyle={{
                    color: color === Color.primaryBrandColor ? Color.importantTextOnTertiaryColorBackground : Color.textColor,
                    fontSize: Layout.smallContentSize,
                    fontFamily: color === Color.primaryBrandColor ? 'Asap-SemiBold' : 'Asap-Regular',
                }}
                dropdownStyle={{
                    padding: Layout.generalPadding / 2,
                    borderBottomWidth: 0,
                    height: props.height ? props.height : 300,
                    width: 200,
                    borderRadius: Layout.borderRadius,
                    overflow: 'hidden',
                    borderWidth: 0,
                    backgroundColor: Color.textField,
                }}
                dropdownTextStyle={{
                    color: Color.secondaryColor,
                    fontSize: Layout.smallContentSize,
                    fontFamily: 'Asap-Regular',
                    backgroundColor: Color.textField,
                }}
                dropdownTextHighlightStyle={{
                    color: Color.textColor,
                    fontFamily: 'Asap-SemiBold',
                }}
                renderSeparator={() => <View></View>}
                adjustFrame={({ width, height, top, left, right }) => {
                    top = top + Layout.generalPadding;
                    left = left - Layout.generalPadding;
                    right = right - Layout.generalPadding;
                    return { width, height, top, left, right };
                }}
                renderRightComponent={() => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            name="keyboard-arrow-down"
                            size={22}
                            color={Color.primaryColor}
                        />
                    </View>
                )}
                defaultValue={props.defaultValue}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Dropdown;
