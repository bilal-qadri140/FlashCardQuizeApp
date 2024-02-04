import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type QuizResultParams = NativeStackScreenProps<RootStackParamList, 'ShowResult'>
const ShowResult = ({ navigation, route }: QuizResultParams) => {

    const [result, setResult] = useState<number>()
    const { score } = route.params
    // let score = [true, false, false, true, true]
    console.log('Score in Result Screen --> ', score);

    useEffect(() => {
        // setResultPositive(0)
        let resultPositive = 0
        score.map((value) => {
            if (value === true) {
                resultPositive++
            }
        })
        const total = score.length
        console.log('True => ', resultPositive);
        console.log('Total ', total)
        if (resultPositive) {
            const totalResult = (resultPositive / total) * 100
            setResult(totalResult)
        } else {
            setResult(0)
        }
        console.log('Result is ', result);

    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Quiz Result</Text>
            <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeading}>This result is based on only selected options (Passing marks is 60%)</Text>
            </View>
            <View>
                <Text style={[styles.messageText, (result === 0 || result && result <= 60) ? { color: 'red' } : { color: 'green' }]}>{(result === 0 || result && result <= 60) ? 'Opps! you failed😒' : 'Congratulations! 😍 you are passed.'}</Text>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>Your Score is: </Text>
                    <Text style={[styles.scoreText, (result === 0 || result && result <= 60) ? { color: 'red' } : { color: 'green' }]}>{result?.toFixed(2) + '%'}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => {
                navigation.navigate('DrawerNavigation')
            }}>
                <Text style={[styles.buttonText, styles.elevation]}>Go to Dashboard</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ShowResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
        color: '#666',
    },
    subHeadingContainer: {
        marginBottom: 60,
        alignContent: 'center',
        // justifyContent:'center',
        width: '90%',
        alignSelf: 'center'
    },
    subHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#888',
        textAlign: 'center'
    },
    messageText: {
        marginTop: 40,
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        width: '90%',
        textAlign: 'center',
        height:'auto',
        paddingVertical:8,
        // backgroundColor:'#333'
    },
    scoreContainer: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    scoreLabel: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',

    },
    scoreText: {
        fontSize: 30,
        color: 'green',
        fontWeight: '600'
    },
    button: {
        width: '90%',
        paddingVertical: 10,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,255,0.6)'

    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    elevation: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    }
})