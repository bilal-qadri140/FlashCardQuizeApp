import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// imports for form validation
import { Formik } from 'formik'
import * as yup from 'yup'

// Validations 
const addQuestionValidation = yup.object().shape({
  question: yup
    .string()
    .required('Question is Required'),
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
    .min(1, ({ min }) => `Correct answer must be less then ${min}`)
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
  console.log(name);

  // adding data to database
  const addQuestionToQuiz = async (questionData: any) => {
    try {
      const docRef = await firestore().collection(name).doc(id).collection('questions').add({
        question: questionData.question,
        options: questionData.options,
        correctOptionIndex: questionData.correctOptionIndex,
      })

      console.log('Question added with ID: ', docRef.id);
    } catch (error: any) {
      // console.error('Error adding question: ', error);
      Alert.alert('Error to adding queation', 'Data not inserted!')
    }
  };

  // adding data to firebase 
  const handlePressed = (values: submitParams) => {
    const questionData = {
      question: values.question,
      options: [values.option1, values.option2, values.option3],
      correctOptionIndex: (values.answer - 1),
    }
    addQuestionToQuiz(questionData).then(() => {
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
        onSubmit={values => handlePressed(values)}
        validationSchema={addQuestionValidation}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid
        }) => (
          <>
            <View style={{ height: 140 }}>
              <Text style={styles.label}>Question</Text>
              <TextInput
                style={styles.questionInput}
                numberOfLines={3}
                multiline={true}
                value={values.question}
                onChangeText={handleChange('question')}
              />
              {errors.question ? <View>
                <Text style={{ fontSize: 15, color: 'red' }}>{errors.question}</Text>
              </View> : null}
            </View>
            <Text style={styles.label}>Option 1</Text>
            <View style={styles.optionContainer}>
              <TextInput
                style={styles.optionInput}
                numberOfLines={1}
                value={values.option1}
                onChangeText={handleChange('option1')}
              />
              {errors.option1 ? <View>
                <Text style={{ fontSize: 15, color: 'red' }}>{errors.option1}</Text>
              </View> : null}
            </View>
            <Text style={styles.label}>Option 2</Text>
            <View style={styles.optionContainer}>
              <TextInput
                style={styles.optionInput}
                numberOfLines={1}
                value={values.option2}
                onChangeText={handleChange('option2')}
              />
              {errors.option2 ? <View>
                <Text style={{ fontSize: 15, color: 'red' }}>{errors.option2}</Text>
              </View> : null}
            </View>
            <Text style={styles.label}>Option 3</Text>
            <View style={styles.optionContainer}>
              <TextInput
                style={styles.optionInput}
                numberOfLines={1}
                value={values.option3}
                onChangeText={handleChange('option3')}
              />
              {errors.option3 ? <View>
                <Text style={{ fontSize: 15, color: 'red' }}>{errors.option3}</Text>
              </View> : null}
            </View>
            <Text style={styles.label}>Correct Option</Text>
            <View style={[styles.optionContainer, { height: 90 }]}>
              <TextInput
                style={styles.optionInput}
                numberOfLines={1}
                placeholder='Ex.1,2,3'
                keyboardType='numeric'
                value={values.answer + ''}
                onChangeText={handleChange('answer')}
              />
              {errors.answer ? <View>
                <Text style={{ fontSize: 15, color: 'red' }}>{errors.answer}</Text>
              </View> : null}
            </View>
            {/* Add question button*/}
            <TouchableOpacity
              style={[styles.button]}
              activeOpacity={0.6}
              onPress={() => handleSubmit()}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Add Question</Text>
            </TouchableOpacity>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'center',
    color: '#400F92'
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#888'
  },
  questionInput: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlignVertical: 'top',
    padding: 10,
  },
  optionContainer: {
    // flexDirection: 'row',
    height: 65,
    // backgroundColor: '#eee',
    width: '100%',
  },
  optionInput: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    padding: 8,
    width: '100%',
    height: 45
  },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,255,0.6)',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  }
})