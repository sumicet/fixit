import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';
import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';
import Occupations from '../Tradesperson/Occupations';
import Location from '../Tradesperson/Location';
import StartTime from './StartTime';
import PostedBy from './PostedBy';

const JobCard = props => {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <PostedBy />
                <View style={{ paddingBottom: 5, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Occupations isTitle={true} />
                    </View>
                </View>
                <View style={{ paddingBottom: 5 }}>
                    <SmallContentWithEllipsis
                        style={{ fontFamily: 'asap-semibold' }}
                    >
                        Work type: Bathroom & Kitchen
                    </SmallContentWithEllipsis>
                </View>

                <View style={{ paddingBottom: 5 }}>
                    <SmallContentWithEllipsis>
                        Lost a ring in the sink. I need help retrieving it as it
                        is my wedding ring.
                    </SmallContentWithEllipsis>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Location />
                    <View style={{ paddingLeft: Layout.generalPadding }}>
                        <StartTime />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderRadius: Layout.borderRadius,
        marginVertical: Layout.cardMargin,
        backgroundColor: Color.textField,
        padding: Layout.generalPadding,
    },
});

export default JobCard;
