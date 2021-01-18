import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Color from '../../constants/Color';
import Touchable from '../common/Touchable';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import Layout from '../../constants/Layout';

const ImageSelector = props => {
    const imageContainerSize =
        (Dimensions.get('window').width - 2 * Layout.screenHorizontalPadding) /
        2;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            const updatedImages = [...props.images];
            updatedImages.push(result.uri);
            props.setImages(updatedImages);
        }
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            {props.images.length > 0 &&
                props.images.map((uri, index) => {
                    console.log(index % 2);
                    return (
                        <View
                            style={{
                                flex: 0,
                                width: imageContainerSize,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                style={{
                                    height: imageContainerSize,
                                    width: '100%',
                                }}
                                source={{
                                    uri: uri,
                                }}
                                resizeMethod="resize"
                            />
                        </View>
                    );
                })}

            {props.showPicker && (
                <Touchable
                    onPress={pickImage}
                    style={{
                        flex: 0,
                        height: imageContainerSize,
                        width: imageContainerSize,
                        overflow: 'hidden',
                        backgroundColor: Color.textField,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon name="plus" color={Color.textColor} size={30} />
                </Touchable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({});

export default ImageSelector;
