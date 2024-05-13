/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { RootStackParamList } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    responsiveHeight,
} from "react-native-responsive-dimensions";

import colors from '../config/colors'
import QuestionNotFound from '../Components/QuestionNotFound'
import AppButton from '../Components/AppButton'

// data type for storing title and id information from database
interface dataType {
    // id: string
    question: string
    options: string[]
    currectOption: number
}

type TakeQuizParams = NativeStackScreenProps<RootStackParamList, 'TakeQuiz'>

const TakeQuiz = ({ navigation, route }: TakeQuizParams) => {

    const [quizData, setQuizData] = useState<dataType[]>([])
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [score, setScore] = useState<boolean[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState(-1)
    const [dataFound, setDataFound] = useState(true)

    // data from previouse screen
    const { id, title, name } = route.params

    // Get all documents within a collection
    const getAllDocuments = async () => {
        try {
            setIsloading(true)
            const querySnapshot = await firestore().collection(name).doc(id).collection('questions').get()
            // console.log('data is  ==>>' + querySnapshot);
            const data: dataType[] = []
            querySnapshot.forEach((doc) => {
                const tempData = {
                    // id: doc.id,
                    question: doc.data().question,
                    options: doc.data().options,
                    currectOption: doc.data().correctOptionIndex
                }
                data.push(tempData)
            });
            if (data.length == 0) {
                setDataFound(false)
            }
            setQuizData(data)
            setIsloading(false)
        } catch (error) {
            console.error('Error getting documents:', error)
        }
    };

    useEffect(() => {
        getAllDocuments()
        setScore([])
    }, [])


    // variable for score
    let arr: boolean[] = []

    // Next Question handler
    const handleNext = () => {

        if (quizData[currentIndex]?.currectOption === selectedOption) {
            arr = [...score, true]  // score state is not working properly so i use arr to update the score
            setScore(arr)
            // console.log('score set : ', [...score, true])
        }
        else {
            arr = [...score, false]
            setScore(arr)
            // console.log('score set : ', [...score, false])
        }

        // reached at last question and disable next button
        if (currentIndex === quizData.length - 1) {
            setTimeout(() => {
                navigation.navigate('ShowResult', { score: arr })
            }, 1000);
        }
        else {
            // check for last question
            setCurrentIndex(currentIndex + 1) // updation for next question
            setSelectedOptionIndex(0) // reset answer for next option
            setSelectedOption(-1)
        }
        // console.log('end of function ', score);
    }


    // handling no question found 
    if (!dataFound) {
        return (
            <QuestionNotFound onPress={() => navigation.goBack()} />
        )
    }

    // if question found
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{title}</Text>

            {!isLoading ?
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{quizData[currentIndex]?.question}</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.optionTouchable, selectedOptionIndex === 1 ? { borderColor: 'green', borderWidth: 1 } : {}]}
                        onPress={() => {
                            setSelectedOptionIndex(1) // index for border color

                            setSelectedOption(0) //index for checking correct answer
                        }}
                    >
                        <Text style={styles.optionText}>{quizData[currentIndex]?.options ? quizData[currentIndex]?.options.at(0) : ''}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.optionTouchable, selectedOptionIndex === 2 ? { borderColor: 'green', borderWidth: 1 } : {}]}
                        onPress={() => {
                            setSelectedOptionIndex(2)// index for border color
                            setSelectedOption(1)//index for checking correct answer
                        }}
                    >
                        <Text style={styles.optionText}>{quizData[currentIndex]?.options ? quizData[currentIndex]?.options.at(1) : ''}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.optionTouchable, selectedOptionIndex === 3 ? { borderColor: 'green', borderWidth: 1 } : {}]}
                        onPress={() => {
                            setSelectedOptionIndex(3)// index for border color
                            setSelectedOption(2) //index for checking correct answer
                        }}
                    >
                        <Text style={styles.optionText}>{quizData[currentIndex]?.options ? quizData[currentIndex]?.options.at(2) : ''}</Text>
                    </TouchableOpacity>

                    <AppButton title='Next' onPress={handleNext} disabled={selectedOption === -1} />
                    <TouchableOpacity
                        style={[styles.button, { alignSelf: 'center', marginTop: 20 }]}
                        activeOpacity={0.6}
                        disabled={selectedOption === -1}
                        onPress={handleNext}
                    >
                        <Text style={[styles.buttonText]}>Next</Text>
                    </TouchableOpacity>
                </View> :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Text style={styles.loading}>Loading...</Text> */}
                    <ActivityIndicator color={'red'} size={'large'} />
                </View>
            }

        </View >
    )
}

export default TakeQuiz

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: 30,
        textTransform: 'capitalize'
    },
    questionContainer: {
        marginTop: responsiveHeight(6),
        paddingBottom: 20,
        width: '100%',
        alignSelf: 'center',
    },
    question: {
        fontSize: 22,
        color: colors.medium,
        marginTop: 10,
        fontWeight: 'bold',
        width: '90%',
        alignSelf: 'center'
    },
    optionText: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        color: colors.medium,
    },
    optionTouchable: {
        width: '90%',
        borderRadius: 6,
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: colors.white,
        elevation: 6,
        shadowColor: colors.black
    },
    loading: {
        fontWeight: 'bold',
        fontSize: 35,
        alignSelf: 'center',
        marginTop: '50%'
    },
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