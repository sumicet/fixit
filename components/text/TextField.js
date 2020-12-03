import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Edit from 'react-native-vector-icons/MaterialIcons';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';

const TextField = props => {
    const [height, setHeight] = useState(200);

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
                autoFocus={props.showSearchIcon ? false : true}
            />
            {props.showSearchIcon ? (
                <View
                    style={{
                        backgroundColor: Color.textField,
                        borderTopRightRadius: Layout.borderRadius,
                        borderBottomRightRadius: Layout.borderRadius,
                        padding: Layout.generalPadding,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                    }}
                >
                    <Touchable onPress={props.onPress}>
                        {props.isEditable ? (
                            <Edit
                                name="edit"
                                color={Color.secondaryColor}
                                size={Layout.menuIconSize}
                            />
                        ) : (
                            <Icon
                                name="search"
                                color={Color.secondaryColor}
                                size={Layout.menuIconSize}
                            />
                        )}
                    </Touchable>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({});

export default TextField;
