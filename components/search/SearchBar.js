import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextField from '../text/TextField';
import Layout from '../../constants/Layout';

const SearchBar = props => {

    const [input, setInput] = useState();

    const onChangeText = (input) => {

    }

    return (
        <View
            style={{
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <TextField
                showSearchIcon={true}
                onPress={() => {}}
                value={props.input}
                onChangeText={input => {
                    onChangeText(input);
                }}
                placeholder="Plumber, John Doe etc."
                multiline={false}
                containerStyle={{ marginVertical: Layout.generalMargin }}
                textAlignVertical="center"
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default SearchBar;
