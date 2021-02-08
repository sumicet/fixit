import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/alert/Alert';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import LineDescription from '../../components/common/LineDescription';
import Container from '../../components/containers/Container';
import Empty from '../../components/empty/Empty';
import EndOfPageSpace from '../../components/layout/EndOfPageSpace';
import QuoteCard from '../../components/quotes/QuoteCard';
import { ERROR } from '../../constants/Actions';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import { deleteQuote } from '../../store/actions/job';

const QuotesScreen = props => {
    const quotes = useSelector(state => state.job.quotes);
    const requests = useSelector(state => state.job.requests);
    const userType = useSelector(state => state.auth.userType);

    const handleQuotePress = quote => {
        userType === 'tradesperson'
            ? props.navigation.navigate('MyJobsStackWithoutCustomHeader', {
                  screen: 'JobDetails',
                  params: {
                      id: quote.jobId,
                  },
              })
            : props.navigation.navigate('TradespersonProfile', {
                  screen: 'TradespersonProfile',
                  params: { tradespersonId: quote.tradespersonId },
              });
    };

    const handleQuoteEdit = quote => {
        props.navigation.navigate('NewQuote', {
            quote,
        });
    };

    const handleQuoteDelete = quote => {
        setModalVisible({
            visible: true,
            quote: quote,
        });
    };

    const dispatch = useDispatch();

    const handleDeletePress = quote => {
        setModalVisible({
            visible: false,
            quote: null,
        });
        dispatch(deleteQuote(quote.jobId, quote.tradespersonId));
    };

    const [modalVisible, setModalVisible] = useState({
        visible: false,
        quote: null,
    });

    const RenderItemForTradesperson = props => {
        const { item, index } = props;
        return (
            <View>
                <QuoteCard
                    quote={item}
                    userType={userType}
                    onQuoteEdit={handleQuoteEdit}
                    onQuoteDelete={handleQuoteDelete}
                    onQuotePress={handleQuotePress}
                />
            </View>
        );
    };

    const RenderItemForCustomer = props => {
        const { item, index } = props;
        return (
            <View>
                {index === 0 && <LineDescription text="Received" />}

                {!quotes ||
                    (quotes.length === 0 && (
                        <Line style={{ flex: 0 }}>
                            <Empty size="small" />
                        </Line>
                    ))}

                {index === quotes.length && <LineDescription text="Sent" />}

                {index < quotes.length ? (
                    <QuoteCard
                        quote={item}
                        userType={userType}
                        onQuoteEdit={handleQuoteEdit}
                        onQuoteDelete={handleQuoteDelete}
                        onQuotePress={handleQuotePress}
                    />
                ) : (
                    <QuoteCard
                        isRequest={true}
                        quote={item}
                        userType={userType}
                        onQuotePress={handleQuotePress}
                    />
                )}
                {index === quotes.length - 1 &&
                    (!requests || requests.length === 0) && (
                        <LineDescription
                            style={{
                                paddingTop: Layout.screenHorizontalPadding,
                            }}
                            text="Sent"
                        />
                    )}
                {index === quotes.length - 1 &&
                    (!requests || requests.length === 0) && (
                        <Line style={{ flex: 0 }}>
                            <Empty size="small" />
                        </Line>
                    )}
            </View>
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    paddingBottom: Layout.screenHorizontalPadding,
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }}
            >
                {userType === 'customer' ? (
                    <RenderItemForCustomer item={item} index={index} />
                ) : userType === 'tradesperson' && (
                    <RenderItemForTradesperson item={item} index={index} />
                )}
            </View>
        );
    };

    return (
        <Container
            style={{ paddingTop: 0, marginTop: 0, paddingHorizontal: 0 }}
        >
            <Alert
                modalVisible={modalVisible.visible}
                onPress={() => handleDeletePress(modalVisible.quote)}
                hide={() => {
                    setModalVisible({
                        visible: false,
                        quote: null,
                    });
                }}
                title="Delete"
                titleColor={Color.urgent}
                message="Are you sure you want to delete this quote?"
                style={ERROR}
            />
            {quotes.length + requests.length > 0 ? (
                <FlatList
                    keyExtractor={(item, i) => `key-${i}`}
                    data={
                        userType === 'tradesperson'
                            ? quotes
                            : quotes.concat(requests)
                    }
                    renderItem={renderItem}
                    style={{ flex: 1 }}
                    ListFooterComponent={() => <EndOfPageSpace />}
                />
            ) : (
                <View
                    style={{
                        paddingHorizontal: Layout.screenHorizontalPadding,
                    }}
                >
                    <LineDescription text="Received" />
                    <Line style={{ flex: 0 }}>
                        <Empty size="small" />
                    </Line>
                    <LineDescription text="Sent" />
                    <Line style={{ flex: 0 }}>
                        <Empty size="small" />
                    </Line>
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({});

export default QuotesScreen;
