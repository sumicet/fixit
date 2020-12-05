import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ModalDropdown from '../../components/dropdown/ModalDropdown';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import SmallContent from '../text/SmallContent';

const Dropdown = props => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <View style={{ paddingRight: Layout.generalPadding }}>
                <SmallContent style={{ color: Color.secondaryColor }}>
                    {props.label}
                </SmallContent>
            </View>
            <ModalDropdown
                isFullWidth={true}
                options={props.options}
                style={{
                    backgroundColor: Color.secondaryBrandColor,
                    padding: Layout.generalPadding,
                    justifyContent: 'center',
                    borderWidth: 0,
                    width: 200,
                    borderRadius: Layout.borderRadius,
                }}
                textStyle={{
                    color: Color.primaryColor,
                    fontSize: Layout.smallContentSize,
                    fontFamily: 'Asap-SemiBold',
                }}
                dropdownStyle={{
                    padding: Layout.generalPadding / 2,
                    borderBottomWidth: 0,
                    height: 300,
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
                    console.log(top);
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
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Dropdown;
