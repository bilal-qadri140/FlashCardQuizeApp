import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";




const ModalComponenet = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={true}>
                <View style={styles.newModal}>
                    <Text style={styles.modalHeading}>Add Title</Text>
                </View>
            </Modal>
        </View>
    )
}

export default ModalComponenet

const styles = StyleSheet.create({
    newModal: {
        height: 300,
        width: '95%',
        alignSelf: 'center',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    modalHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#666',
        marginVertical: 10,
        alignSelf: 'center'
    },
    modaleInput: {
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        fontSize: 18,
        paddingHorizontal: 10,
        fontWeight: 'bold'
    },
    modalButton: {
        borderRadius: 6,

    },
    modalButtonText: {
        color: '#444',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        right: 20,
    },

})