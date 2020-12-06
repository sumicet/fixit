import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import QuizScreen from '../../components/containers/QuizScreen';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';

const TitledScrollableContent = props => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: props.backgroundColor },
            ]}
        >
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='always'>
                <QuizScreen
                    title={props.title}
                    centerTitle={true}
                    rightOfTitleComponent={props.rightOfTitleComponent}
                    style={[
                        styles.quizScreen,
                        {
                            paddingHorizontal: 0,
                            backgroundColor: props.backgroundColor,
                        },
                    ]}
                    titleColor={props.titleColor}
                >
                    <View
                        style={{ backgroundColor: Color.primaryColor, flex: 1 }}
                    >
                        {props.children}
                    </View>
                </QuizScreen>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        marginTop: Layout.screenTopMargin,
    },
    quizScreen: {
        paddingHorizontal: Layout.screenHorizontalPadding,
        marginTop: 0,
    },
});

export default TitledScrollableContent;
