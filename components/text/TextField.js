import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Edit from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import { useSelector } from 'react-redux';

const TextField = props => {
    const [height, setHeight] = useState(200);
    var inputRef = useRef();
    const isFocused = useIsFocused();
    const [wasAlreadyFocusedOnce, setWasAlreadyFocusedOnce] = useState(false);

    useEffect(() => {
        if (props.route === 'Search' && isFocused && !wasAlreadyFocusedOnce) {
            inputRef.focus();
            setWasAlreadyFocusedOnce(true);
        }
    }, [props, isFocused]);

    const userType = useSelector(state => state.auth.userType);

    const filters =
        userType === 'customer'
            ? useSelector(state => state.tradespeople.filters)
            : useSelector(state => state.job.filters);

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                },
                props.containerStyle,
            ]}
        >
            <TextInput
                ref={input => {
                    inputRef = input;
                }}
                //autoFocus={props.route === 'Search' ? true : false}
                {...props}
                onContentSizeChange={e => {
                    const newHeight = e.nativeEvent.contentSize.height;
                    newHeight > props.minHeight && newHeight <= props.maxHeight
                        ? setHeight(newHeight)
                        : null;
                }}
                placeholderTextColor={Color.placeholderTextColor}
                selectionColor={Color.primaryBrandColor}
                style={[
                    {
                        fontSize: Layout.contentSize,
                        paddingVertical: Layout.generalPadding,
                        paddingLeft: Layout.generalPadding,
                        paddingRight: props.showSearchIcon
                            ? 0
                            : Layout.generalPadding,
                        borderTopRightRadius: props.showSearchIcon
                            ? 0
                            : Layout.borderRadius,
                        borderBottomRightRadius: props.showSearchIcon
                            ? 0
                            : Layout.borderRadius,
                        borderTopLeftRadius: Layout.borderRadius,
                        borderBottomLeftRadius: Layout.borderRadius,
                        color: Color.textColor,
                        backgroundColor: Color.textField,
                        flex: 1,
                    },
                    props.multiline ? { height: height } : null,
                    props.style,
                ]}
                underlineColorAndroid="transparent"
            />
            {props.showSearchIcon && (
                <View
                    style={{
                        backgroundColor: Color.textField,
                        padding: Layout.generalPadding,
                        paddingRight: Layout.screenHorizontalPadding,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Touchable onPress={props.onPress}>
                        <Icon
                            name="search"
                            color={Color.secondaryColor}
                            size={Layout.menuIconSize}
                        />
                    </Touchable>
                </View>
            )}
            {props.showSearchIcon && (
                <View
                    style={{
                        backgroundColor: Color.textField,
                        borderTopRightRadius: Layout.borderRadius,
                        borderBottomRightRadius: Layout.borderRadius,
                        padding: Layout.generalPadding,
                        paddingLeft: 0,
                        paddingRight: Layout.screenHorizontalPadding,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Touchable onPress={props.onPress}>
                        <Icon2
                            name="filter"
                            color={
                                filters.occupationId ||
                                filters.distance !== 2 ||
                                (userType === 'customer' && filters.rating)
                                    ? Color.primaryBrandColor
                                    : Color.secondaryColor
                            }
                            size={Layout.menuIconSize}
                        />
                    </Touchable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({});

export default TextField;
