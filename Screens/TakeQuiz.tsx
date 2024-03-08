import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    responsiveHeight, responsiveWidth,
} from "react-native-responsive-dimensions";

import LottieView from 'lottie-react-native';

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
    const [isWaiting, setIsWaiting] = useState(false)
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
            <View style={[styles.container, { justifyContent: 'center', backgroundColor: '#fff' }]}>
                {/* <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#555',margin:20 }}>No Questions Found!</Text> */}
                <LottieView
                    duration={2000}
                    style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(45),
                        elevation: 15,
                    }} source={require('../assets/Images/datanotfound.json')} autoPlay loop />
                <TouchableOpacity
                    style={[styles.button]}
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#fff',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#666',
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
        color: '#000',
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
        color: '#666',
    },
    optionTouchable: {
        width: '90%',
        borderRadius: 6,
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        elevation: 6,
        shadowColor: '#000'
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
        backgroundColor: 'rgba(0,0,255,0.6)',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff',
        textTransform: "capitalize"
    },
})