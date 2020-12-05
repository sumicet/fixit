import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import QuizScreen from '../../components/containers/QuizScreen';
import Layout from '../../constants/Layout';
import TextField from '../../components/text/TextField';
import { setJobDescription } from '../../store/actions/quiz';

const JobDescription = props => {
    const oldDescription = useSelector(state => state.quiz.jobDescription);
    const [input, setInput] = useState(oldDescription);

    const onChangeText = updatedInput => {
        setInput(updatedInput);
    };

    return (
        <TextField
            value={input}
            onChangeText={input => {
                onChangeText(input);
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
