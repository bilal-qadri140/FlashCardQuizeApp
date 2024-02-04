import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    responsiveHeight,
} from "react-native-responsive-dimensions";

// data type for storing title and id information from database
interface dataType {
    id: string
    question: string
    options: string[]
    currectOption: number
}

type TakeQuizParams = NativeStackScreenProps<RootStackParamList, 'TakeQuiz'>

const TakeQuiz = ({ navigation, route }: TakeQuizParams) => {
    const [quizData, setQuizData] = useState<dataType[]>([])
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [score, setScore] = useState<boolean[]>([])

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
                    id: doc.id,
                    question: doc.data().question,
                    options: doc.data().options,
                    currectOption: doc.data().correctOptionIndex
                }
                data.push(tempData)
            });
            setQuizData(data)
            setIsloading(false)
        } catch (error) {
            console.error('Error getting documents:', error)
        }
    };

    useEffect(() => {
        getAllDocuments()
        setScore([])
        console.log('Take Quizn visited')
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{title}</Text>
            <View style={styles.list}>
                {!isLoading ? <FlatList
                    data={quizData}
                    showsVerticalScrollIndicator={false}

                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.question}>{item.question}</Text>
                            <View>
                                <TouchableOpacity style={[styles.optionTouchable]}
                                    onPress={() => {
                                        if (item.currectOption === 0)
                                            setScore(prevScore => [...prevScore, true])
                                        else
                                            setScore(prevScore => [...prevScore, false])
                                        console.log(score)
                                    }}
                                >
                                    <Text style={styles.optionText}>{item.options ? item.options.at(0) : ''}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.optionTouchable}
                                    onPress={() => {
                                        if (item.currectOption === 1)
                                            setScore(prevScore => [...prevScore, true])
                                        else
                                            setScore(prevScore => [...prevScore, false])
                                        console.log(score)
                                    }}
                                >
                                    <Text style={styles.optionText}>{item.options ? item.options.at(1) : ''}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.optionTouchable}
                                    onPress={() => {
                                        if (item.currectOption === 2)
                                            setScore(prevScore => [...prevScore, true])
                                        else
                                            setScore(prevScore => [...prevScore, false])
                                        console.log(score)
                                    }}
                                >
                                    <Text style={styles.optionText}>{item.options ? item.options.at(2) : ''}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                /> :
                    <View style={{ flex: 1 }}>
                        <Text style={styles.loading}>Loading...</Text>
                    </View>}
            </View>

            {!isLoading ? <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.6}
                    onPress={() => {
                        setScore([])
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} activeOpacity={0.6}
                    onPress={() => {
                        navigation.navigate('ShowResult', { score: score })
                        setScore([])
                    }}
                >
                    <Text style={[styles.buttonText, styles.elevation]}>Submit test</Text>
                </TouchableOpacity>
            </View> : null}
        </View>
    )
}

export default TakeQuiz

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height:responsiveHeight(100),
        // marginBottom: 70,
        backgroundColor: '#fff',
        // width:'90%'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
        color: '#666'
    },
    list: {
        height: responsiveHeight(74),
        // marginBottom: '50%',
        // paddingHorizontal: 20,
        // backgroundColor:'#333',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        bottom: 0,
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
    },
    elevation: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
})