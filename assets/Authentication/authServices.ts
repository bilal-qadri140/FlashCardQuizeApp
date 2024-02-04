
import auth from '@react-native-firebase/auth';

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    });
  });
};

export { getCurrentUser };