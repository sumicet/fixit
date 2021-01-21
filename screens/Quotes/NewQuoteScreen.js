import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import JobCard from '../../components/cards/Job/JobCard';
import Line from '../../components/common/Line';
import LineDescription from '../../components/common/LineDescription';
import Touchable from '../../components/common/Touchable';
import Container from '../../components/containers/Container';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import TextField from '../../components/text/TextField';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import { ERROR, SUCCESS } from '../../constants/Actions';
import Alert from '../../components/alert/Alert';
import { addQuote } from '../../store/actions/job';
import { setInAppNotification } from '../../store/actions/ui';

const NewQuoteScreen = props => {
    const quoteToEdit = props.route.params && props.route.params.quote;
    const jobId = quoteToEdit
        ? quoteToEdit.jobId
        : props.route.params && props.route.params.jobId;
    const tradespersonId = quoteToEdit
        ? quoteToEdit.tradespersonId
        : useSelector(state => state.auth.userId);
    const [message, setMessage] = useState(
        quoteToEdit ? quoteToEdit.message : null
    );
    const [price, setPrice] = useState({
        value: quoteToEdit ? quoteToEdit.price.value : null,
        currency: quoteToEdit ? quoteToEdit.price.currency : null,
    });

    const job = useSelector(state => state.job.allJobs).find(
        job => job.id === jobId
    );

    useEffect(() => {
        props.navigation.setOptions({ headerRight: headerRight });
    });

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
                        console.log('pressy');
                        if (price.value === null) {
                            console.log('hah1');
                            dispatch(
                                setInAppNotification(
                                    'Price missing',
                                    'The price cannot be missing when sending a quote.',
                                    ERROR
                                )
                            );
                        } else {
                            if (price.currency === null) {
                                console.log('hah2');
                                dispatch(
                                    setInAppNotification(
                                        'Currency missing',
                                        'The currency cannot be missing when sending a quote.',
                                        ERROR
                                    )
                                );
                            } else {
                                if (isNaN(price.value)) {
                                    console.log('hah');
                                    dispatch(
                                        setInAppNotification(
                                            'Price not a number',
                                            "The first field under the 'Price' category must only contain numbers.",
                                            ERROR
                                        )
                                    );
                                } else {
                                    setModalVisible(true);
                                }
                            }
                        }
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Icon
                            name="check"
                            color={Color.importantTextOnTertiaryColorBackground}
                            size={Layout.menuIconSize}
                        />
                    </View>
                </Touchable>
            </View>
        );
    };

    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleSendQuote = () => {
        dispatch(addQuote(jobId, tradespersonId, price, message)).then(() => {
            dispatch(
                setInAppNotification(
                    quoteToEdit ? 'Edit' : 'Sent',
                    quoteToEdit
                        ? 'The quote has been successully updated.'
                        : 'The quote has been successully sent.',
                    SUCCESS
                )
            );
            props.navigation.goBack();
        });
    };

    return (
        <ScrollableContainer style={{ paddingTop: 0, marginTop: 0 }}>
            <Alert
                modalVisible={modalVisible}
                onPress={handleSendQuote}
                hide={() => {
                    setModalVisible(false);
                }}
                title={quoteToEdit ? 'Edit' : 'Send'}
                titleColor={Color.urgent}
                message={
                    quoteToEdit
                        ? 'Are you sure you want to edit this quote?'
                        : 'Are you sure you want to sent this quote?'
                }
                style={SUCCESS}
            />
            <JobCard
                userId={job.userId}
                occupationId={job.occupationId}
                workTypeId={job.workTypeId}
                jobDescription={job.jobDescription}
                jobAddress={job.jobAddress}
                startTimeId={job.startTimeId}
                date={job.date}
            />
            <LineDescription text="Your quote" />
            <LineDescription text="Price" />
            <Line
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <TextField
                    defaultValue={price.value}
                    onChangeText={input =>
                        setPrice({
                            value: input,
                            currency: price.currency,
                        })
                    }
                    placeholder="300"
                    multiline={false}
                    textAlignVertical="center"
                    style={{
                        color: Color.textColor,
                        backgroundColor: Color.textField,
                        flex: 0,
                        width: 100,
                        marginRight: Layout.generalPadding,
                    }}
                    secureTextEntry={false}
                />
                <TextField
                    defaultValue={price.currency}
                    onChangeText={input =>
                        setPrice({
                            value: price.value,
                            currency: input,
                        })
                    }
                    placeholder="$"
                    multiline={false}
                    textAlignVertical="center"
                    style={{
                        color: Color.textColor,
                        backgroundColor: Color.textField,
                        width: 100,
                        flex: 0,
                    }}
                    secureTextEntry={false}
                />
            </Line>
            <LineDescription text="Message" />
            <Line style={{ flex: 0 }}>
                <TextField
                    value={message}
                    onChangeText={input => {
                        setMessage(input);
                    }}
                    placeholder="The price includes the following... Please call for further information."
                    multiline={true}
                    minHeight={200}
                    //maxHeight={(80 / 100) * Dimensions.get('window').height}
                    maxHeight={200}
                    textAlignVertical="top"
                />
            </Line>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default NewQuoteScreen;
