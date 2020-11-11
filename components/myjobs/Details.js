import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import Header from '../text/Header';
import SmallContent from '../text/SmallContent';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Location from '../cards/Tradesperson/Location';
import StartTime from '../cards/Job/StartTime';
import PropertyType from './PropertyType';
import CustomerType from './CustomerType';
import StreetAddress from './StreetAddress';

const Details = props => {
    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: Layout.generalPadding }}>
                <Header style={{ textAlign: 'left' }}>
                    Plumber • Bathroom & Kitchen
                </Header>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: Layout.generalMargin,
                }}
            >
                <Location />
                <StreetAddress />
            </View>
            <View style={{ paddingBottom: Layout.generalMargin }}>
                <SmallContent>
                    Lost a ring in the sink. I need help retrieving it as it is
                    my wedding ring. My husband will be so mad at me if I lose
                    it. Please help me. I'm desperate. Stop reading this now.
                    Feet pics attached.
                </SmallContent>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: Layout.generalMargin,
                }}
            >
                <StartTime />
                <PropertyType />
                <CustomerType />
            </View>
            <ScrollView horizontal>
                <View
                    style={{
                        marginRight: 5,
                        borderRadius: Layout.borderRadius,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        source={{
                            uri:
                                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-why-do-my-feet-hurt-toes-1594663599.png?crop=0.914xw:0.687xh;0.0864xw,0.110xh&resize=480:*',
                        }}
                        resizeMethod="scale"
                        style={styles.image}
                    />
                </View>
                <View
                    style={{
                        marginRight: 5,
                        borderRadius: Layout.borderRadius,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        source={{
                            uri:
                                'https://cdn10.phillymag.com/wp-content/uploads/sites/3/2019/10/feet-fb.jpg',
                        }}
                        resizeMethod="scale"
                        style={styles.image}
                    />
                </View>
                <View
                    style={{
                        marginRight: 5,
                        borderRadius: Layout.borderRadius,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        source={{
                            uri:
                                'https://original-content.imgix.net/2017/03/Man_Feet-1024x576.jpg?w=1024&h=1024',
                        }}
                        resizeMethod="scale"
                        style={styles.image}
                    />
                </View>
                <View
                    style={{
                        marginRight: 5,
                        borderRadius: Layout.borderRadius,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        source={{
                            uri:
                                'https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/health-and-wellbeing/conditions/happyfeetshutterstock_297390392768x576.jpg',
                        }}
                        resizeMethod="scale"
                        style={styles.image}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderRadius: Layout.borderRadius,
        marginVertical: Layout.cardMargin,
        //backgroundColor: Color.textField,
        padding: Layout.generalPadding,
    },
    image: {
        height: 100,
        width: 100,
    },
});

export default Details;
