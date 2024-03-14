import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native'
import React from 'react'


type ModalProps = {
    animationType: 'fade' | 'none' | 'slide' | undefined
    transparent: boolean
    visible: boolean
    onShow: () => void
    onRequestClose: () => void
    handleTitle: (title: string) => void
    handleCancel: () => void
    handleConfirm: () => void
}


const ModalComponenet = ({
    animationType,
    transparent,
    visible,
    onShow,
    onRequestClose,
    handleTitle,
    handleCancel,
    handleConfirm
}: ModalProps
) => {
    return (
        <Modal
            visible={visible}
            animationType={animationType}
            transparent={transparent}
            onShow={onShow}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modal}>
                <Text style={styles.modalHeading}>Add Title</Text>

                {/* Text input */}
                <TextInput
                    placeholder='Title'
                    style={styles.modaleInput}
                    onChangeText={(title) => handleTitle(title)}
                />

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.modalButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                        <Text style={styles.modalButtonText}>CONFIRM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalComponenet

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: '35%',
        height: 200,
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20,
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
        paddingHorizontal: 12,
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
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        right: 20,
    },

})