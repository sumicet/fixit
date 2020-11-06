import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const TextField = props => {
    const [height, setHeight] = useState(200);

    return (
        <TextInput
            {...props}
            onContentSizeChange={e => {
                const newHeight = e.nativeEvent.contentSize.height;
                newHeight > props.minHeight && newHeight <= props.maxHeight
                    ? setHeight(newHeight)
                    : null;
            }}
            textAlignVertical="top"
            placeholderTextColor={Color.placeholderTextColor}
            selectionColor={Color.primaryBrandColor}
            style={[
                props.style,
                {
                    fontSize: Layout.contentSize,
                    padding: Layout.generalPadding,
                    borderRadius: Layout.borderRadius,
                    color: Color.textColor,
                    backgroundColor: Color.textField,
                },
                props.multiline ? { height: height } : null,
            ]}
            underlineColorAndroid="transparent"
        />
    );
};

const styles = StyleSheet.create({});

export default TextField;
