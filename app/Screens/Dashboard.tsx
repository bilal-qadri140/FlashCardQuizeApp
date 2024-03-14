import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps, } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import Modal1 from "react-native-modal";
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

import ListItem from '../Components/ListItem';
import ItemDelete from '../Components/ItemDelete';
import ModalComponenet from '../Components/ModalComponent';


// data type for storing title and id information from database
interface dataType {
  id: string
  title: string
}


// Navigation Screen Props
type NavigationPrams = NativeStackScreenProps<RootStackParamList>

// main App Starts
const Dashboard = ({ navigation }: NavigationPrams) => {

  // Hooks
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState<string>()
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [titleData, setTitleData] = useState<dataType[]>([])
  const [reload, setReload] = useState<boolean>()
  const [name, setName] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [id, setId] = useState<string>('')
  const [quizTitle, setQuizTitle] = useState<string>('')

  // adding title of quiz to database
  const addingTitle = async (title: string) => {
    // console.log(title);
    try {
      await firestore().collection(name).add({
        title: title,
      });
      // console.log('Quiz added with ID: ', docRef.id);
    } catch (error) {
      console.log(error)
    }
    setTitle(undefined)
  }

  // Get all documents within a collection
  const getAllDocuments = async (collectionName: string) => {
    try {
      setIsloading(true)
      const querySnapshot = await firestore().collection(collectionName).get()
      // console.log('data ==>>>' + querySnapshot);

      const data: dataType[] = []
      querySnapshot.forEach((doc) => {
        const tempData = {
          id: doc.id,
          title: doc.data().title
        }
        data.push(tempData)
      });
      setTitleData(data)
      // console.log("xz", data);
      setIsloading(false)
    } catch (error) {
      console.error('Error getting documents:', error)
    }
  };


  useEffect(() => {
    if (auth().currentUser?.displayName) {
      const collectionName = auth().currentUser?.displayName;
      setName(convertToString(collectionName))
      getAllDocuments(convertToString(collectionName))
    }
  }, [reload])

  // conveting into string type
  function convertToString(value: string | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    return value;
  }

  useFocusEffect(
    useCallback(() => {
      setIsModalVisible(false)
    }, [])
  )

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleTitlePressed = (id: string, title: string) => {
    toggleModal()
    setId(id)
    console.log(id);
    setQuizTitle(title)
  }

  // deleting title from firebase
  const handleDelete = (id: string) => {
    firestore().collection(name).doc(id).delete().then(() => ToastAndroid.show('Quiz Topic Deleted', ToastAndroid.LONG)).catch(() => {
      ToastAndroid.show('Error deleting title!', ToastAndroid.LONG)
    })
    setReload(!reload)
  }


  // Modal Handling section
  const handleCancel = () => {
    setVisible(false)
  }

  const handleConfirm = () => {
    setReload(!reload)
    if (title) {
      addingTitle(title)
      setVisible(false)
    }
    else {
      Alert.alert('Error', 'Please add Title of Quiz')
    }
  }


  if (isLoading) {
    return (
      // <Text style={styles.loadingText}>Loading...</Text>
      <ActivityIndicator animating={true} size={100} style={{ marginTop: '50%' }} theme={{ colors: { primary: 'green' } }} />
    )
  }


  // starting JSX.Element
  return (
    <View style={[visible ? { backgroundColor: '#666', flex: 1 } : { backgroundColor: '#fff', flex: 1 }]}>
      {/* heading text */}
      <Text style={{ fontSize: 30, alignSelf: 'center', fontWeight: 'bold', color: '#555', marginVertical: 10 }}>
        Quiz Topics
      </Text>

      {/* list of quiz topics from firebase */}
      <FlatList
        data={titleData}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (<View style={{ height: 2, backgroundColor: visible ? '#666' : '#ddd' }}></View>)}
        renderItem={({ item }) => <ListItem
          key={item.title}
          item={item}
          onPress={() => { handleTitlePressed(item.id, item.title) }}
          renderRightActions={() => <ItemDelete onPress={() => { handleDelete(item.id) }} />}
          visible={isModalVisible}
          modalVisible={visible}
        />}
      />

      {/* Modal for Take Quiz and add Questions */}
      {isModalVisible ?
        <Modal1
          isVisible={isModalVisible}
          animationIn={'bounceInLeft'}
          animationInTiming={1500}
          onBackButtonPress={toggleModal}
        >
          <View style={styles.modal}>
            <TouchableOpacity style={styles.modalButton} activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('TakeQuiz', { title: quizTitle, id: id, name: name })
              }}
            >
              <Text style={styles.modalButtonText}>Take Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton]} activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('AddQuestions', { title: quizTitle, id: id, name: name })
              }}
            >
              <Text style={styles.modalButtonText}>Add New Question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#bbb' }]}
              activeOpacity={0.6}
              onPress={toggleModal}
            >
              <Text style={[styles.modalButtonText, { color: '#000' }]}>CANCEL</Text>
            </TouchableOpacity>

          </View>
        </Modal1>
        : null
      }

      {/* Custom Modal import from Components folder */}
      <ModalComponenet
        animationType='slide'
        transparent={true}
        visible={visible}
        onShow={() => { console.log('Modal Shown') }}
        onRequestClose={() => {
          console.log('Modal Closed')
          setVisible(!visible)
        }}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        handleTitle={(value) => setTitle(value)}
      />


      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.floatingButton]} activeOpacity={0.7}
        onPress={() => {
          setVisible(true)
        }}
      >
        <Icon name='add' size={40} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({

  modal: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    height: 'auto',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  modalButton: {
    backgroundColor: '#0000ff99',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingVertical: 8,
    color: '#fff',
  },
  floatingButton: {
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000ff99',
    // backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
})