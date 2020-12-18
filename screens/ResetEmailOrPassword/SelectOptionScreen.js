import React from 'react';
import { View, StyleSheet } from 'react-native';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Container from '../../components/containers/Container';
import OptionSelector from '../../components/common/OptionSelector';

const SelectOption = props => {
    return (
        <OptionSelector
            text1="Reset email"
            onPress1={() => {}}
            text2="Reset password"
            onPress2={() => {
                props.navigation.navigate('VerifyEmail');
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default SelectOption;
