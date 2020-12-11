import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import Quiz from '../../components/quiz/Quiz';

const EditJobScreen = props => {

    return (
        <Quiz
            title="Edit"
            editModeOn={true}
            id={props.route.params.id}
            navigation={props.navigation}
            route={props.route}
        />
    );
};

const styles = StyleSheet.create({});

export default EditJobScreen;
