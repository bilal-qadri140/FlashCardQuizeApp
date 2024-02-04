import { Alert, Button, FlatList, NativeEventEmitter, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps, } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import Modal from "react-native-modal";
import { useFocusEffect } from '@react-navigation/native';
// data type for storing title and id information from database
interface dataType {
  id: string
  title: string
}

// Navigation Screen Props
type NavigationPrams = NativeStackScreenProps<RootStackParamList>

// main App Starts
const Dashboard = ({ navigation, route }: NavigationPrams) => {

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
    console.log(title);
    try {
      const docRef = await firestore().collection(name).add({
        title: title,
      });
      console.log('Quiz added with ID: ', docRef.id);
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
      console.log('data ==>>>' + querySnapshot);

      const data: dataType[] = []
      querySnapshot.forEach((doc) => {
        const tempData = {
          id: doc.id,
          title: doc.data().title
        }
        data.push(tempData)
      });
      setTitleData(data)
      console.log("xz", data);
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

  // starting JSX.Element
  return (
    <View style={[visible ? { backgroundColor: '#666', flex: 1 } : { backgroundColor: '#fff', flex: 1 }]}>
      <Text style={{ fontSize: 30, alignSelf: 'center', fontWeight: 'bold', color: '#666',marginVertical:10 }}>
        Quiz Topics
      </Text>
      {!isLoading ? <FlatList
        data={titleData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.list, styles.elevation, visible ? { backgroundColor: '#666' } : {}]} activeOpacity={0.5}
            onPress={() => {
              toggleModal()
              setId(item.id)
              setQuizTitle(item.title)
            }}
            disabled={visible}
          >
            <Text style={styles.listText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      /> :
        <Text style={styles.loadingText}>Loading...</Text>
      }


      {isModalVisible ?
        <Modal
          isVisible={isModalVisible}
          animationIn={'bounceInLeft'}
          animationInTiming={2000}
          onBackButtonPress={toggleModal}
        >
          <View style={styles.newModal}>
            <TouchableOpacity style={styles.newModalButton} activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('TakeQuiz', { title: quizTitle, id: id, name: name })
              }}
            >
              <Text style={styles.newModalButtonText}>Take Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newModalButton} activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('AddQuestions', { title: quizTitle, id: id, name: name })
              }}
            >
              <Text style={styles.newModalButtonText}>Add New Question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.newModalButton, { backgroundColor: '#bbb' }]}
              activeOpacity={0.6}
              onPress={toggleModal}
            >
              <Text style={[styles.newModalButtonText, { color: '#000' }]}>CANCEL</Text>
            </TouchableOpacity>

          </View>
        </Modal>
        : null
      }

      {/* Custom Modal/Dialog box */}
      {visible ?
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>Add Title</Text>

          {/* Text input */}
          <TextInput
            placeholder='Title'
            style={styles.modaleInput}
            onChangeText={(val) => setTitle(val)}
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.modalButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setReload(!reload)
              if (title) {
                addingTitle(title)
                setVisible(false)
              }
              else {
                Alert.alert('Error', 'Please add Title of Quiz')
              }
            }}>
              <Text style={styles.modalButtonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
        : null
      }

      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.button]} activeOpacity={0.7}
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
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  listText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '50%',
    color: '#444'
  },

  newModal: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    height: 'auto',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  newModalButton: {
    backgroundColor: '#0000ff99',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  newModalButtonText: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingVertical: 8,
    color: '#fff',

  },
  modal: {
    position: 'absolute',
    top: '30%',
    height: 200,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 17,
    // marginTop:'40%'
    borderWidth: 1.5,
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
    paddingLeft: 15,
  },
  buttonContainer: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },

  button: {
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000ff99',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  elevation: {
    shadowColor: "#000",
    elevation: 4,
  }
})