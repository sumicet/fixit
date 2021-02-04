import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import TextField from '../text/TextField';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const SearchBar = props => {
    const [input, setInput] = useState();

    const onChangeText = input => {};

    const userType = useSelector(state => state.auth.userType);

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
                placeholder={
                    userType === 'customer'
                        ? 'Plumber, John Doe, etc.'
                        : 'Builder, Chimney work, etc.'
                }
                multiline={false}
                textAlignVertical="center"
            />
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({});

export default SearchBar;
