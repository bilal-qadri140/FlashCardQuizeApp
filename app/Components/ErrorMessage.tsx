import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FormikTouched } from 'formik'

type ErrorProps = {
    error: string | undefined
    visible: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined
}

const ErrorMessage = ({ error ,visible  }: ErrorProps) => {
    if (!error || ! visible) return null
    return (
        <Text style={styles.error}>{error}</Text>
    )
}

export default ErrorMessage

const styles = StyleSheet.create({
    error: {
        color: "red",
        marginLeft: 10,
    }
})