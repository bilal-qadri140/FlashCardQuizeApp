import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../config/colors'

type ButtonProps = {
    onPress: () => void
    disabled?: boolean
    title: string
}

const AppButton = ({ onPress, disabled = false, title }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button]}
            activeOpacity={0.6}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{ title }</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        width: '45%',
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: colors.white,
        textTransform: "uppercase"
    },
})