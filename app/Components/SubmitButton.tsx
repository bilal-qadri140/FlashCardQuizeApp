import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import colors from '../config/colors'

type ButtonProps = {
    title: string
}
const SubmitButton = ({ title }: ButtonProps) => {
    const { handleSubmit } = useFormikContext()
    return (
        <TouchableOpacity
            style={[styles.button]}
            activeOpacity={0.6}
            onPress={() => handleSubmit()}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 20,
        backgroundColor: colors.primary,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        textTransform: "uppercase"
    }
})