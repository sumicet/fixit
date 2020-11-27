import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Trash from 'react-native-vector-icons/Foundation';

import Header from '../text/Header';
import SmallContent from '../text/SmallContent';
import SmallBoldContent from '../text/SmallBoldContent';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import StartTime from '../cards/Job/StartTime';
import PropertyType from './PropertyType';
import CustomerType from './CustomerType';
import PostedBy from '../cards/Job/PostedBy';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { WORK_TYPES } from '../../data/Jobs/WorkTypes';
import LocationIcon from '../../assets/icons/Card/LocationIcon';
import Touchable from '../common/Touchable';

const Details = props => {
    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: Layout.generalPadding - 2 }}>
                <PostedBy
                    date={props.job.date}
                    textColor={Color.textOnTertiaryColorBackground}
                />
            </View>

            <View
                style={{
                    paddingBottom: Layout.generalPadding,
                    flexDirection: 'row',
                }}
            >
                <Header
                    style={{
                        textAlign: 'left',
                        color: Color.primaryBrandColor,
                    }}
                >
                    {
                        OCCUPATIONS.find(
                            occ => occ.id === props.job.occupationId
                        ).name
                    }
                </Header>
                <Header
                    style={{
                        textAlign: 'left',
                        color: Color.primaryBrandColor,
                    }}
                >
                    {' '}
                    •{' '}
                </Header>
                <Header
                    style={{
                        textAlign: 'left',
                        color: Color.primaryBrandColor,
                    }}
                >
                    {
                        WORK_TYPES.find(occ => occ.id === props.job.workTypeId)
                            .name
                    }
                </Header>
            </View>
            <View style={{ paddingBottom: Layout.generalPadding }}>
                <SmallBoldContent
                    style={{ color: Color.textOnTertiaryColorBackground }}
                >
                    {props.job.jobDescription}
                </SmallBoldContent>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    paddingBottom: Layout.generalPadding,
                    alignItems: 'center',
                }}
            >
                <LocationIcon
                    color={Color.textOnTertiaryColorBackground}
                    size={Layout.cardBigIconSize}
                />
                <View>
                    <SmallContent> </SmallContent>
                </View>
                <View style={{ flex: 1 }}>
                    <SmallContent
                        style={{ color: Color.textOnTertiaryColorBackground }}
                    >
                        25km • {props.job.jobAddress.line1} •{' '}
                        {props.job.jobAddress.line2}
                    </SmallContent>
                </View>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: Layout.generalMargin,
                }}
            >
                <StartTime startTimeId={props.job.startTimeId} color={Color.textOnTertiaryColorBackground} />
                <PropertyType
                    propertyType={props.job.propertyType}
                    color={Color.textOnTertiaryColorBackground}
                />
                <CustomerType
                    customerType={props.job.customerType}
                    color={Color.textOnTertiaryColorBackground}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: Layout.generalMargin,
                }}
            >
                <Touchable
                    style={{ flex: 0 }}
                    onPress={() => {
                        //
                        props.navigation.navigate('Occupations', {
                            action: 'edit',
                        });
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Icon
                            name="edit"
                            color={Color.textOnTertiaryColorBackground}
                            size={Layout.menuIconSize}
                        />
                    </View>
                </Touchable>

                <View style={styles.iconContainer}>
                    <Trash
                        name="trash"
                        color={Color.textOnTertiaryColorBackground}
                        size={Layout.menuIconSize}
                    />
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
    },
    image: {
        height: 100,
        width: 100,
    },
    iconContainer: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Details;
