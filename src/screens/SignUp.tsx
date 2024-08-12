import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {WelcomeLogo} from '../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
  const rnBiometrics = new ReactNativeBiometrics();
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const Handlesignup = async () => {
    try {
      if (isEnabled) {
        const result = await rnBiometrics.simplePrompt({
          promptMessage: 'Authorize Biometric',
        });

        if (result.success) {
          await AsyncStorage.setItem(
            'userCredentials',
            JSON.stringify({email, Password}),
          );

          // sign up
          const response = await auth().createUserWithEmailAndPassword(
            email,
            Password,
          );

          await firestore()
            .collection('Users')
            .doc( response.user.uid)
            .set({
              name: name,
              email: response.user.email,
              id: response.user.uid,
              providerId: response.user.providerId,
              isActive:Boolean
            })
            .then(() => {
              console.log('User added!');
            });
        } else {
          Alert.alert('Error ', 'Fingerprint does not match');
        }
      }
      else  {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          Password,
        );

        await firestore()
          .collection('Users')
          .doc( response.user.uid)
          .set({
            name: name,
            email: response.user.email,
            id: response.user.uid,
            providerId: response.user.providerId,
           isactive:response.user.isactive,
          })
          .then(() => {
            console.log('User added!');
          });
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Something went wrong');

      // console.log(err);
    }
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
          Sign Up
        </Text>
      </View>

      <View
        style={{
          //   backgroundColor: 'lightgreen',
          flex: 4,
          justifyContent: 'space-around',
        }}>
        <View>
          <Text style={{marginLeft: 50, color: 'black', marginBottom: 5}}>
            Name
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
            value={name}
            onChangeText={value => setName(value)}
          />
        </View>
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
          onPress={() => Handlesignup()}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 10}}>
          {isEnabled ? 'enable biometric' : 'enable biometric '}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          disabled={false} // Disable the switch
          style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}} // Scale the switch
        />
      </View>
    </>
  );
};

export default SignUp;
