import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import TextField from '../text/TextField';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { WORK_TYPES } from '../../data/Jobs/WorkTypes';
import { searchAllJobs } from '../../store/actions/job';
import { searchAllTradespeople } from '../../store/actions/tradespeople';
import { setSearchBarText } from '../../store/actions/ui';

const SearchBar = props => {
    const input = useSelector(state => state.ui.searchBarText);

    const dispatch = useDispatch();

    const onChangeText = updatedInput => {
        dispatch(setSearchBarText(updatedInput));
    };

    const userType = useSelector(state => state.auth.userType);

    return (
        <View
            style={{
                justifyContent: 'center',
            }}
        >
            <TextField
                route={props.route.name}
                showSearchIcon={true}
                onPress={() => {
                    Keyboard.dismiss();
                    userType === 'tradesperson'
                        ? dispatch(searchAllJobs(input.trim()))
                        : dispatch(searchAllTradespeople(input.trim()));
                }}
                onFiltersPress={() => {
                    props.navigation.navigate('HomeStackWithoutSearchBar', {
                        screen: 'Filters',
                    });
                }}
                value={input}
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
        </View>
    );
};

const styles = StyleSheet.create({});

export default SearchBar;
