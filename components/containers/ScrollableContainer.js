import React from 'react';
import { ScrollView } from 'react-native';

import Container from './Container';
import Layout from '../../constants/Layout';

const ScrollableContainer = (props) => {
    return (
        <Container style={{ paddingTop: 0, paddingHorizontal: 0, marginTop: 0 }}>
            <ScrollView
                style={[{
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }, props.style]}
            >
                {props.children}
            </ScrollView>
        </Container>
    );
};

export default ScrollableContainer;