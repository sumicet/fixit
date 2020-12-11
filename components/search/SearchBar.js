import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import TextField from '../text/TextField';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const SearchBar = props => {
    const [input, setInput] = useState();

    const onChangeText = input => {};

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.navigation.navigate('Search');
            }}
            style={{
                justifyContent: 'center',
            }}
        >
            <TextField
                route={props.route.name}
                onTouchStart={() => {
                    if (props.route.name === 'Home') {
                        props.navigation.navigate('Search');
                    }
                }}
                showSearchIcon={true}
                onPress={() => {}}
                value={props.input}
                onChangeText={input => {
                    onChangeText(input);
                }}
                placeholder="Plumber, John Doe etc."
                multiline={false}
                textAlignVertical="center"
            />
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({});

export default SearchBar;
