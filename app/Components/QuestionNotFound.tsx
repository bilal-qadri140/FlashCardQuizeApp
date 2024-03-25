import { StyleSheet, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import colors from '../config/colors'
import AppButton from './AppButton'

type Props = {
    onPress: () => void
}

const QuestionNotFound = ({ onPress }: Props) => {
    return (
        <View style={[styles.container, { justifyContent: 'center', backgroundColor: '#fff' }]}>
            <LottieView
                duration={2000}
                style={{
                    width: responsiveWidth(100),
                    height: responsiveHeight(45),
                    elevation: 15,
                }} source={require('../../assets/Images/datanotfound.json')} autoPlay loop />
            <AppButton title='Go Back' onPress={onPress} />
        </View>
    )
}

export default QuestionNotFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center'
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