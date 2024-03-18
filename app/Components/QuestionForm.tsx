import { StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { Formik } from 'formik'

type FormProps = {
    addQuestionValidation: any
    children: ReactNode
    handleSubmit: (values: any) => void
    initialValues: any
}

const QuestionForm = ({ handleSubmit, addQuestionValidation, initialValues, children }: FormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => handleSubmit(values)}
            validationSchema={addQuestionValidation}
        >
            {
                () => {
                    return (
                        <>
                            {children}
                        </>
                    )
                }
            }
        </Formik>
    )
}

export default QuestionForm

const styles = StyleSheet.create({})