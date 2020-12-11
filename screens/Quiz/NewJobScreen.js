import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import Quiz from '../../components/quiz/Quiz';

const NewJobScreen = props => {

    return (
        <Quiz title="New" navigation={props.navigation} route={props.route} />
    );
};

const styles = StyleSheet.create({});

export default NewJobScreen;
