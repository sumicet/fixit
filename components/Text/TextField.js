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
            placeholderTextColor="#c3c3c7"
            selectionColor={Color.primaryBrandColor}
            style={{
                fontSize: Layout.contentSize,
                padding: Layout.generalPadding,
                height: height,
                borderRadius: Layout.borderRadius,
                color: Color.textColor,
                backgroundColor: '#f0f0f5',
            }}
            underlineColorAndroid="transparent"
        />
    );
};

const styles = StyleSheet.create({});

export default TextField;
