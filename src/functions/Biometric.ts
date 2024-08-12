import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export const generateBiometricKey = async (userId: any) => {
  try {
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    if (!keysExist) {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'place your finger on sensor',
      });
      console.log('doof', result);
      if (result.success) {
        const result = await rnBiometrics.createKeys();
        console.log('key',result)
      }
      await AsyncStorage.setItem('biometricUserId', userId);
      console.log('Public Key:', result.publicKey);
      Alert.alert(
        'Keys Generated',
        'Biometric keys have been successfully generated.',
      );
    } else {
      console.log('Keys already exist');
      Alert.alert('Keys Exist', 'Biometric keys already exist.');
    }
  } catch (error) {
    console.error('Error generating keys:', error);
    Alert.alert('Error', 'An error occurred while generating biometric keys.');
  }
};
