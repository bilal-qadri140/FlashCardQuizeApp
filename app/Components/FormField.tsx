import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import ErrorMessage from './ErrorMessage';
import AppTextInput from './AppTextInput';

interface FormFieldProps extends TextInputProps {
    name: string
}


interface MyFormValues {
    [key: string]: any;
}
const FormField = ({ name,...otherProps }: FormFieldProps) => {
    const { handleChange, setFieldTouched, errors, touched } = useFormikContext<MyFormValues>()
    console.log(name,errors[name]?.toString());
    
    return (
        <View>
            <AppTextInput
                numberOfLines={3}
                multiline={true}
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                {...otherProps}
            />
            {errors[name] && <ErrorMessage error={errors[name]?.toString()} visible={touched[name]} />}
        </View>
    )
}

export default FormField

const styles = StyleSheet.create({})