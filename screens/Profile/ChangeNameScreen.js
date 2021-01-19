import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import LineDescription from '../../components/common/LineDescription';
import Container from '../../components/containers/Container';
import SmallContent from '../../components/text/SmallContent';

import TextField from '../../components/text/TextField';
import { SUCCESS } from '../../constants/Actions';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import { changeName } from '../../store/actions/auth';
import { setInAppNotification } from '../../store/actions/ui';

const ChangeName = props => {
    const name = useSelector(state => state.auth.name);
    const [value, setValue] = useState(name);

    const userType = useSelector(state => state.auth.userType);
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();

    const handleOnPress = () => {
        dispatch(changeName(userId, value, userType));
        props.navigation.goBack();
        dispatch(
            setInAppNotification(
                'Changes saved!',
                'You have successfully updated your name.',
                SUCCESS
            )
        );
    };

    return (
        <Container style={{ paddingTop: 0, marginTop: 0 }}>
            <LineDescription text="Please select a new name.">
                <SmallContent>
                    This name is your public identity on this application. It is
                    recommended to use your full name.
                </SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <TextField
                    defaultValue={value}
                    onChangeText={input => setValue(input)}
                    placeholder={props.placeholder}
                    multiline={false}
                    textAlignVertical="center"
                    style={{
                        color: Color.textColor,
                        backgroundColor: Color.textField,
                    }}
                    secureTextEntry={false}
                    autoCapitalize="words"
                />
            </Line>
            <Line
                style={{ flex: 0, paddingTop: Layout.screenHorizontalPadding }}
            >
                <MediumButton text="Confirm" onPress={handleOnPress} />
            </Line>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default ChangeName;
