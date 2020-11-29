import React from 'react';
import { ScrollView } from 'react-native';

import Container from './Container';
import Layout from '../../constants/Layout';

const ScrollableContainer = (props) => {
    return (
        <Container style={{ paddingTop: 0, paddingHorizontal: 0 }}>
            <ScrollView
                style={{
                    paddingTop: Layout.screenVerticalPadding,
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }}
            >
                {props.children}
            </ScrollView>
        </Container>
    );
};

export default ScrollableContainer;