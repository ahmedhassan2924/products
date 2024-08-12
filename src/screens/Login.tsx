import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState,} from 'react';
import {WelcomeLogo} from '../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
// import {generateBiometricKey} from '../functions/Biometric';

const rnBiometrics = new ReactNativeBiometrics();

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const loginWithEmailPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, Password)
      .then(async userCredential => {
        // await generateBiometricKey(userCredential.user.uid);
        Alert.alert('Login Successful', 'You have successfully logged in');
      })
      .catch(error => {
        console.error('Error logging in with email and password: ', error);
        Alert.alert('Login Failed', error.message);
      });
  };

  const loginWithBiometrics = async () => {
    try {
      const result = await rnBiometrics.isSensorAvailable();
      const {available} = result;
      if (available) {
        const result = await rnBiometrics.simplePrompt({
          promptMessage: 'Authorize Biometric',
        });

        if (result.success) {
          const savedData = await AsyncStorage.getItem('userCredentials');
          let userCredentials;
          if (savedData) {
            userCredentials = JSON.parse(savedData);
          }

          auth()
            .signInWithEmailAndPassword(
              userCredentials.email,
              userCredentials.Password,
            )
            .then(async userCredential => {

              console.log('dd',userCredential);
              
              Alert.alert(
                'Login Successful',
                'You have successfully logged in',
              );
            })
            .catch(error => {
              console.error(
                'Error logging in with email and password: ',
                error,
              );
              Alert.alert('Login Failed', error.message);
            });
        } else {
          Alert.alert(
            'Authentication Failed',
            'You cancelled the biometric prompt',
          );
        }
      } else {
        Alert.alert(
          'Biometrics Not Supported',
          'Biometric authentication is not supported or available on this device',
        );
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      Alert.alert(
        'Authentication Error',
        'An error occurred during biometric authentication',
      );
    }
  };

  return (
    <>
      <View style={{flex: 4}}>
        <View style={{height: '100%', width: '100%', position: 'absolute'}}>
          <Icon
            name="arrow-left"
            size={30}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Image style={{height: '100%', width: '100%'}} source={WelcomeLogo} />
        </View>
      </View>
      <View
        style={{
          //   backgroundColor: 'blue',
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '900',
            color: 'black',
          }}>
          Login
        </Text>
      </View>

      <View
        style={{
          //   backgroundColor: 'lightgreen',
          flex: 2,
          justifyContent: 'space-around',
        }}>
        <View>
          <Text style={{marginLeft: 50, color: 'black', marginBottom: 5}}>
            Email
          </Text>
          <TextInput
            style={{
              height: 35,
              width: '80%',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              marginLeft: 40,
            }}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View>
          <Text style={{marginLeft: 50, color: 'black', marginBottom: 5}}>
            Password
          </Text>
          <TextInput
            style={{
              height: 35,
              width: '80%',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              marginLeft: 40,
            }}
            secureTextEntry={true}
            value={Password}
            onChangeText={value => setPassword(value)}
          />
        </View>

        <Text style={{marginLeft: 40}}>Forget Password?</Text>
      </View>
      <View
        style={{
          //   backgroundColor: 'yellow',
          flex: 2,
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 40,
            width: 100,
            backgroundColor: '#514EB5',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 40,
          }}
          onPress={() => loginWithEmailPassword()}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //   backgroundColor: 'yellow',
          flex: 2,
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 40,
            width: 100,
            backgroundColor: '#514EB5',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 40,
          }}
          onPress={() => loginWithBiometrics()}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Login using FingerPrint
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
