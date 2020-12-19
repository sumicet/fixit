import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Trash from 'react-native-vector-icons/Foundation';

import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Header from '../../components/text/Header';
import SmallContent from '../../components/text/SmallContent';
import SmallBoldContent from '../../components/text/SmallBoldContent';
import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import { useDispatch, useSelector } from 'react-redux';
import SectionedContainer from '../../components/containers/SectionedContainer';
import Line from '../../components/common/Line';
import PostedBy from '../../components/cards/Job/PostedBy';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { WORK_TYPES } from '../../data/Jobs/WorkTypes';
import LocationIcon from '../../assets/icons/Card/LocationIcon';
import StartTime from '../../components/cards/Job/StartTime';
import PropertyType from '../../components/myjobs/PropertyType';
import CustomerType from '../../components/myjobs/CustomerType';
import Touchable from '../../components/common/Touchable';
import { deleteJob } from '../../store/actions/job';
import Alert from '../../components/alert/Alert';
import Loading from '../../components/loading/Loading';

const JobDetailsScreen = props => {
    const job = useSelector(state => state.job.userPendingJobs).find(
        elem => elem.id === props.route.params.id
    ); // TODO only works for customer

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        props.navigation.setOptions({headerRight: headerRight})
    })

    const showAlert = () => {
        setModalVisible(true);
    };

    const handleHideAlert = () => {
        setModalVisible(false);
    };

    const onDeleteConfirm = () => {
        handleHideAlert();
        dispatch(deleteJob(job.id));
        props.navigation.navigate('MyJobs', {
            action: 'delete',
        });
    };

    const dispatch = useDispatch();

    if (!job) {
        return <Loading />;
    }

    const TopComponent = () => {
        return (
            <View>
                <Line style={{ alignItems: 'flex-start' }}>
                    <PostedBy
                        date={job.date}
                        textColor={Color.textOnTertiaryColorBackground}
                    />
                </Line>
                <Line
                    style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                    }}
                >
                    <Header
                        style={{
                            textAlign: 'left',
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    >
                        {
                            OCCUPATIONS.find(occ => occ.id === job.occupationId)
                                .name
                        }{' '}
                    </Header>
                    <Header
                        style={{
                            textAlign: 'left',
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    >
                        (
                    </Header>
                    <Header
                        style={{
                            textAlign: 'left',
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    >
                        {
                            WORK_TYPES.find(
                                work =>
                                    work.id === job.workTypeId &&
                                    work.occupationId === job.occupationId
                            ).name
                        }
                    </Header>
                    <Header
                        style={{
                            textAlign: 'left',
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    >
                        )
                    </Header>
                </Line>
                <Line style={{ alignItems: 'flex-start' }}>
                    <SmallContent
                        style={{ color: Color.importantTextOnTertiaryColorBackground }}
                    >
                        {job.jobDescription}
                    </SmallContent>
                </Line>
                <Line>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
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
                </Line>
                <Line
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <StartTime
                        startTimeId={job.startTimeId}
                        color={Color.textOnTertiaryColorBackground}
                    />
                    <PropertyType
                        propertyType={job.propertyType}
                        color={Color.textOnTertiaryColorBackground}
                    />
                    <CustomerType
                        customerType={job.customerType}
                        color={Color.textOnTertiaryColorBackground}
                    />
                </Line>
                <Line style={{ flexDirection: 'row' }}>
                    <LocationIcon
                        size={Layout.cardBigIconSize}
                        color={Color.textOnTertiaryColorBackground}
                    />
                    <View>
                        <SmallContent> </SmallContent>
                    </View>
                    <View style={{ flex: 1 }}>
                        <SmallContent
                            style={{
                                color: Color.textOnTertiaryColorBackground,
                            }}
                        >
                            25km • {job.jobAddress.line1} •{' '}
                            {job.jobAddress.line2}
                        </SmallContent>
                    </View>
                </Line>
            </View>
        );
    };

    const MidComponent = () => {
        return (
            <View>
                <Line>
                    <SmallBoldContent
                        style={{ color: Color.primaryBrandColor }}
                    >
                        3 people have applied for this job.
                    </SmallBoldContent>
                </Line>
            </View>
        );
    };

    const BottomComponent = () => {
        return (
            <View
                style={{
                    paddingBottom: Layout.screenHorizontalPadding,
                }}
            >
                <View>
                    <Header style={{ textAlign: 'left' }}>Quotes:</Header>
                </View>
                <TradespersonCard navigation={props.navigation} hasQuote={true} quote="200£" tradespersonId='1p6PpA2vNhe6jZ4mfg4GZSLGhYz2' />
                <TradespersonCard navigation={props.navigation} hasQuote={true} quote="320£" tradespersonId='1p6PpA2vNhe6jZ4mfg4GZSLGhYz2' />
                <TradespersonCard navigation={props.navigation} hasQuote={true} quote="190£" tradespersonId='1p6PpA2vNhe6jZ4mfg4GZSLGhYz2' />
            </View>
        );
    };

    const headerRight = () => {
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                }}
            >
                <Touchable
                    style={{
                        flex: 0,
                        padding: Layout.screenHorizontalPadding / 2,
                    }}
                    onPress={() => {
                        props.navigation.navigate('EditJob', {
                            id: job.id,
                        });
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Icon
                            name="edit"
                            color={Color.importantTextOnTertiaryColorBackground}
                            size={Layout.menuIconSize}
                        />
                    </View>
                </Touchable>

                <Touchable
                    style={{
                        flex: 0,
                        padding: Layout.screenHorizontalPadding / 2,
                    }}
                    onPress={() => {
                        showAlert();
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Trash
                            name="trash"
                            color={Color.importantTextOnTertiaryColorBackground}
                            size={Layout.menuIconSize}
                        />
                    </View>
                </Touchable>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <SectionedContainer
                title="Details"
                titleColor={Color.importantTextOnTertiaryColorBackground}
                topComponent={<TopComponent />}
                midComponent={<MidComponent />}
                bottomComponent={<BottomComponent />}
                navigation={props.navigation}
            />
            <Alert
                modalVisible={modalVisible}
                onPress={onDeleteConfirm}
                hide={handleHideAlert}
                title="Delete"
                titleColor={Color.urgent}
                message="Are you sure you want to delete this job?"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
    },
});

export default JobDetailsScreen;
