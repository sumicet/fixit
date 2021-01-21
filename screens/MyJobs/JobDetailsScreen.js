import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Trash from 'react-native-vector-icons/Foundation';
import Briefcase from 'react-native-vector-icons/MaterialCommunityIcons';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';

import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Header from '../../components/text/Header';
import SmallContent from '../../components/text/SmallContent';
import SmallBoldContent from '../../components/text/SmallBoldContent';
import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import { useDispatch, useSelector } from 'react-redux';
import Line from '../../components/common/Line';
import PostedBy from '../../components/cards/Job/PostedBy';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { WORK_TYPES } from '../../data/Jobs/WorkTypes';
import Touchable from '../../components/common/Touchable';
import { deleteJob, markAsCompleted } from '../../store/actions/job';
import Alert from '../../components/alert/Alert';
import Loading from '../../components/loading/Loading';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import LineDescription from '../../components/common/LineDescription';
import { START_TIMES } from '../../data/Jobs/StartTimes';
import GoogleMaps from '../../components/APIs/GoogleMaps';
import { CUSTOMER_TYPES } from '../../data/Jobs/CustomerTypes';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';
import EndOfPageSpace from '../../components/layout/EndOfPageSpace';
import ImageSelector from '../../components/images/ImageSelector';
import { ERROR, SUCCESS } from '../../constants/Actions';
import { setInAppNotification } from '../../store/actions/ui';
import SmallBubble from '../../components/common/SmallBubble';

const latitudeDelta = 0.005;
const longitudeDelta = 0.005;

const JobDetailsScreen = props => {
    const userType = useSelector(state => state.auth.userType);
    const job1 = useSelector(state => state.job.userPendingJobs).find(
        elem => elem.id === props.route.params.id
    );
    const job2 = useSelector(state => state.job.userCompletedJobs).find(
        elem => elem.id === props.route.params.id
    );

    const job =
        userType === 'customer'
            ? job1
                ? job1
                : job2
            : useSelector(state => state.job.allJobs).find(
                  elem => elem.id === props.route.params.id
              );

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({
        title: null,
        message: null,
        onPress: null,
        style: null,
    });

    const quote =
        userType === 'tradesperson' &&
        useSelector(state => state.job.quotes).find(
            quote => quote.jobId === job.id
        );

    useEffect(() => {
        props.navigation.setOptions({ headerRight: headerRight });
    });

    const showAlert = (title, message, onPress, style) => {
        setModalData({
            title: title,
            message: message,
            onPress: onPress,
            style: style,
        });
        setModalVisible(true);
    };

    const handleHideAlert = () => {
        setModalVisible(false);
    };

    const handleMarkAsCompleted = () => {
        props.navigation.goBack();
        dispatch(markAsCompleted(job.id)).then(() => {
            dispatch(
                setInAppNotification(
                    'Completed',
                    'The job has been successfully marked completed',
                    SUCCESS
                )
            );
        });
    };

    const onDeleteConfirm = () => {
        handleHideAlert();
        dispatch(deleteJob(job.id));
        props.navigation.navigate('MyJobs', {
            action: 'delete',
        });
    };

    const dispatch = useDispatch();

    const headerRight = () => {
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                }}
            >
                {userType === 'customer' && job1 && (
                    <Touchable
                        style={{
                            flex: 0,
                            padding: Layout.screenHorizontalPadding / 2,
                        }}
                        onPress={() => {
                            showAlert(
                                'Completed',
                                'Are you sure you want to mark this job completed?',
                                handleMarkAsCompleted,
                                SUCCESS
                            );
                        }}
                    >
                        <View style={styles.iconContainer}>
                            <Check
                                name="briefcase-check"
                                color={
                                    Color.importantTextOnTertiaryColorBackground
                                }
                                size={Layout.menuIconSize}
                            />
                        </View>
                    </Touchable>
                )}

                {userType === 'customer' && job1 && (
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
                                color={
                                    Color.importantTextOnTertiaryColorBackground
                                }
                                size={Layout.menuIconSize}
                            />
                        </View>
                    </Touchable>
                )}

                {userType === 'customer' && (
                    <Touchable
                        style={{
                            flex: 0,
                            padding: Layout.screenHorizontalPadding / 2,
                        }}
                        onPress={() => {
                            showAlert(
                                'Delete',
                                'Are you sure you want to delete this job?',
                                onDeleteConfirm,
                                ERROR
                            );
                        }}
                    >
                        <View style={styles.iconContainer}>
                            <Trash
                                name="trash"
                                color={
                                    Color.importantTextOnTertiaryColorBackground
                                }
                                size={Layout.menuIconSize}
                            />
                        </View>
                    </Touchable>
                )}

                {userType === 'tradesperson' && (
                    <Touchable
                        style={{
                            flex: 0,
                            padding: Layout.screenHorizontalPadding / 2,
                        }}
                        onPress={() => {
                            quote
                                ? props.navigation.navigate('NewQuote', {
                                      jobId: job.id,
                                      quote,
                                  })
                                : props.navigation.navigate('NewQuote', {
                                      jobId: job.id,
                                  });
                        }}
                    >
                        <View style={styles.iconContainer}>
                            <Briefcase
                                name={
                                    quote ? 'briefcase-edit' : 'briefcase-plus'
                                }
                                color={
                                    Color.importantTextOnTertiaryColorBackground
                                }
                                size={Layout.menuIconSize}
                            />
                        </View>
                    </Touchable>
                )}
            </View>
        );
    };

    const [region, setRegion] = useState({
        latitudeDelta,
        longitudeDelta,
        latitude: 12.840575,
        longitude: 77.651787,
    });

    const initialRegionSettings = async id => {
        const apiUrlSelected = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBM6YK35TEtbw_k76cKUnwOMsEjiFmBRm0&place_id=${id}`;
        const selectedResult = await fetch(apiUrlSelected);
        const jsonSelected = await selectedResult.json();
        setRegion({
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
            latitude: jsonSelected.result.geometry.location.lat,
            longitude: jsonSelected.result.geometry.location.lng,
        });
    };

    useEffect(() => {
        initialRegionSettings(job.jobAddress.place_id);
    }, []);

    if (!job) {
        return <Loading />;
    }

    const Bubble = props => {
        return (
            <View
                style={{
                    padding: Layout.generalPadding,
                    marginHorizontal: Layout.generalPadding / 2,
                    backgroundColor: props.backgroundColor,
                    borderRadius: Layout.borderRadius,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    height: 50,
                    marginBottom: Layout.generalPadding,
                }}
            >
                <SmallContent
                    style={{
                        color: Color.importantTextOnTertiaryColorBackground,
                        fontFamily: 'SemiBold',
                        textAlign: 'center',
                    }}
                >
                    {props.text}
                </SmallContent>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Alert
                modalVisible={modalVisible}
                onPress={modalData.onPress}
                hide={handleHideAlert}
                title={modalData.title}
                titleColor={Color.urgent}
                message={modalData.message}
                style={modalData.style}
            />
            <ScrollableContainer backgroundColor={Color.primaryColor}>
                <View>
                    <Line style={{ flex: 0, alignItems: 'flex-start' }}>
                        <PostedBy
                            size="medium"
                            textColor={Color.textOnTertiaryColorBackground}
                            date={job.date}
                            userId={job.userId}
                        />
                    </Line>
                    <Line style={{ flex: 0, flexDirection: 'row' }}>
                        <Bubble
                            text={
                                OCCUPATIONS.find(
                                    oc => oc.id === job.occupationId
                                )?.name
                            }
                            backgroundColor={Color.primaryBrandColor}
                        />
                        <Bubble
                            text={
                                WORK_TYPES.find(
                                    work =>
                                        work.id === job.workTypeId &&
                                        work.occupationId === job.occupationId
                                )?.name
                            }
                            backgroundColor={Color.secondaryBrandColor}
                        />
                    </Line>
                    <LineDescription
                        text="Requested starting time"
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <SmallBubble
                            style={{
                                flex: 0,
                                backgroundColor:
                                    job.startTimeId === 1 ||
                                    job.startTimeId === 2
                                        ? Color.error
                                        : job.startTimeId === 3 ||
                                          job.startTimeId === 4
                                        ? Color.warning
                                        : Color.textField,
                                marginLeft: Layout.generalPadding,
                            }}
                            textStyle={{
                                fontFamily: 'SemiBold',
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                            text={
                                START_TIMES.find(
                                    time => time.id === job.startTimeId
                                )?.name
                            }
                        />
                    </LineDescription>
                    <LineDescription text="Description" />
                    <Line style={{ flex: 0 }}>
                        <SmallBubble
                            style={{
                                width: '100%',
                            }}
                            text={job.jobDescription}
                        />
                    </Line>
                    <LineDescription text="Address" />
                    <Line style={{ flex: 0 }}>
                        <SmallBubble
                            style={{
                                width: '100%',
                            }}
                            text={
                                job.jobAddress.line1 +
                                '; ' +
                                job.jobAddress.line2
                            }
                        />
                    </Line>
                    <Line style={{ flex: 0 }}>
                        <View
                            style={{
                                borderRadius: Layout.borderRadius,
                                overflow: 'hidden',
                                width: '100%',
                            }}
                        >
                            <GoogleMaps
                                region={region}
                                onRegionChange={region => setRegion(region)}
                            />
                        </View>
                    </Line>
                    <LineDescription
                        text="Tags"
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <SmallBubble
                            style={{
                                marginLeft: Layout.generalPadding,
                                flex: 0,
                            }}
                            text={
                                CUSTOMER_TYPES.find(
                                    customer => customer.id === job.customerType
                                )?.name
                            }
                        />
                        <SmallBubble
                            style={{
                                marginLeft: Layout.generalPadding,
                                flex: 0,
                            }}
                            text={
                                PROPERTY_TYPES.find(
                                    property => property.id === job.propertyType
                                )?.name
                            }
                        />
                    </LineDescription>
                    {job.images && job.images.length > 0 && (
                        <View>
                            <LineDescription text="Images" />
                            <Line style={{ flex: 0 }}>
                                <ImageSelector images={job.images} />
                            </Line>
                        </View>
                    )}
                    <EndOfPageSpace />
                </View>
            </ScrollableContainer>
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
