import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import QuizScreen from '../../components/containers/QuizScreen';
import Layout from '../../constants/Layout';
import TextField from '../../components/text/TextField';
import { setJobDescription } from '../../store/actions/quiz';

const JobDescriptionScreen = props => {
    const oldDescription = useSelector(state => state.quiz.jobDescription);
    const [input, setInput] = useState(oldDescription);

    const dispatch = useDispatch();

    const onChangeText = updatedInput => {
        setInput(updatedInput);
    };

    const handleNextPress = () => {
        dispatch(setJobDescription(input)); //TODO reset input at the end of the quiz
        props.navigation.navigate('CustomerTypes', {
            action: 'edit',
        });
    };

    return (
        <QuizScreen
            title="Job description."
            showNextButton={true}
            onPress={handleNextPress}
        >
            <ScrollView>
                <View style={styles.container}>
                    <TextField
                        value={input}
                        onChangeText={input => {
                            onChangeText(input);
                        }}
                        placeholder="I need to install a radiator."
                        multiline={true}
                        minHeight={200}
                        maxHeight={(80 / 100) * Dimensions.get('window').height}
                        style={{ marginBottom: Layout.generalPadding }}
                        textAlignVertical="top"
                    />
                </View>
            </ScrollView>
        </QuizScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:
            Layout.screenHorizontalPadding,
    },
});

export default JobDescriptionScreen;
