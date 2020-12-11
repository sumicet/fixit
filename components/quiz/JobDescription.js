import React from 'react';
import {  StyleSheet } from 'react-native';

import Layout from '../../constants/Layout';
import TextField from '../../components/text/TextField';

const JobDescription = props => {
    

    return (
        <TextField
            value={props.input}
            onChangeText={input => {
                props.onChangeText(input);
            }}
            placeholder="I need to install a radiator."
            multiline={true}
            minHeight={200}
            //maxHeight={(80 / 100) * Dimensions.get('window').height}
            maxHeight={200}
            style={{ marginBottom: Layout.generalPadding }}
            textAlignVertical="top"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Layout.screenHorizontalPadding,
    },
});

export default JobDescription;
