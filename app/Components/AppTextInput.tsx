import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'


import colors from '../config/colors';

interface InputProps extends TextInputProps {
    placeholder?: string
    [x: string]: any;
}
const AppTextInput = ({ placeholder, ...otherProps }: InputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputText}
                placeholder={placeholder}
                {...otherProps}
            />
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width: '100%',
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: colors.light,
        borderRadius: 25,
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 20,
        color: colors.dark,
        marginRight: 25,
        flex: 1,
        paddingVertical: 13,
    }
})