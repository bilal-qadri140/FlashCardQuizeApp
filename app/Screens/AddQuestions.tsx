import { Alert, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

// imports for form validation
import { Formik } from 'formik'
import * as yup from 'yup'
import FormField from '../Components/FormField';
import SubmitButton from '../Components/SubmitButton';
import colors from '../config/colors';

// Validations 
const addQuestionValidation = yup.object().shape({
  question: yup
    .string()
    .required('Question is required'),
  option1: yup
    .string()
    .required('Option 1 is required'),
  option2: yup
    .string()
    .required('Option 2 is required'),
  option3: yup
    .string()
    .required('Option 3 is required'),
  answer: yup
    .number()
    .min(1, ({ min }) => `Correct answer must be greater then ${min - 1}`)
    .max(3, ({ max }) => `Correct answer must be less then ${max}`)
    .required()
})

//type for data sumbited to firebase
type submitParams = {
  question: string
  option1: string
  option2: string
  option3: string
  answer: number
}


// Navigation Screen props
type NavigationPrams = NativeStackScreenProps<RootStackParamList, 'AddQuestions'>

// main App starts
const AddQuestions = ({ navigation, route }: NavigationPrams) => {

  // data from Dashboard screen
  const { title, id, name } = route.params
  // console.log(name);

  // adding data to database
  const addQuestionToQuiz = async (questionData: any) => {
    try {
      await firestore().collection(name).doc(id).collection('questions').add({
        question: questionData.question,
        options: questionData.options,
        correctOptionIndex: questionData.correctOptionIndex,
      })
    } catch (error: any) {
      Alert.alert('Error to adding queation', 'Data not inserted!')
    }
  };

  // adding data to firebase 
  const handleSubmit = (values: submitParams) => {
    const questionData = {
      question: values.question,
      options: [values.option1, values.option2, values.option3],
      correctOptionIndex: (values.answer - 1),
    }
    addQuestionToQuiz(questionData).then(() => {
      ToastAndroid.show('Question added successfuly.', ToastAndroid.LONG)
      navigation.goBack()
    }).catch(() => {
      Alert.alert('Error', 'Data not added. Please try again later.')
    })
  }

  // JSX starts
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.titleText}>{title}</Text>
      <Formik
        initialValues={{ question: '', option1: '', option2: '', option3: '', answer: 0 }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={addQuestionValidation}
      >
        {() => (
          <>
            <View style={{ height: 140 }}>
              <FormField
                placeholder='Question'
                name='question'
                numberOfLines={3}
                multiline={true}
                textAlignVertical='top'
              />
            </View>
            <FormField
              placeholder='Option 1'
              name='option1'
              numberOfLines={1}
            />
            <FormField
              placeholder='Option 2'
              name='option2'
              numberOfLines={1}
            />
            <FormField
              placeholder='Option 3'
              name='option3'
              numberOfLines={1}
            />
            <FormField
              numberOfLines={1}
              name='answer'
              placeholder='Correct Option Ex.1,2,3'
              keyboardType='numeric'
            />
            
            {/* Add question button*/}
            <SubmitButton title='Add Question'/>
          </>
        )}
      </Formik>
    </ScrollView >
  )
}

export default AddQuestions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  titleText: {
    fontWeight: '800',
    fontSize: 28,
    alignSelf: 'center',
    color: colors.primary,
    marginVertical: 25,
    textTransform: 'capitalize'
  },
})