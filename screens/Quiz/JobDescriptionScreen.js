import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import QuizScreen from '../../components/containers/QuizScreen';
import Layout from '../../constants/Layout';
import TextField from '../../components/Text/TextField';
import { setJobDescription } from '../../store/actions/quiz';

const JobDescriptionScreen = props => {
    const [input, setInput] = useState();
    
    const dispatch = useDispatch();

    const onChangeText = updatedInput => {
        setInput(updatedInput);
    };

    const handleNextPress = () => {
        dispatch(setJobDescription(input)); //TODO reset input at the end of the quiz
        props.navigation.navigate('CustomerTypes');
    }

    return (
        <QuizScreen title="Job description." showNextButton={true} onPress={handleNextPress}>
            <View style={styles.container}>
                <TextField
                    value={props.input}
                    onChangeText={input => {
                        onChangeText(input);
                    }}
                    placeholder="I need to install a radiator."
                    multiline={true}
                    minHeight={200}
                    maxHeight={(80 / 100) * Dimensions.get('window').height}
                />
            </View>
        </QuizScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:
            Layout.screenHorizontalPadding - Layout.generalPadding,
    },
});

export default JobDescriptionScreen;
