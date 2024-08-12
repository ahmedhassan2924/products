import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {WelcomeLogo} from '../assets';
import Icon from 'react-native-vector-icons/FontAwesome';

const Welcome = ({navigation}) => {
  return (
    <>
      <View
        style={{
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{height: '100%', width: '100%'}}>
          <Image style={{height: '100%', width: '100%'}} source={WelcomeLogo} />
        </View>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '900',
            color: 'black',
          }}>
          Hello
        </Text>
        <View style={{height: 60, width: 275}}>
          <Text style={{fontSize: 20}}>
            Welcome to little drop,Where you manage your daily task
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{height: '70%', justifyContent: 'space-between'}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
            style={{
              borderRadius: 25,
              height: 50,
              width: 250,
              backgroundColor: '#514EB5',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '900', color: 'white'}}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
            style={{
              borderRadius: 25,
              height: 50,
              width: 250,
              backgroundColor: 'white',
              alignItems: 'center',
              borderColor: '#514EB5',
              justifyContent: 'center',
              borderWidth: 2,
            }}>
            <Text style={{fontSize: 20, fontWeight: '900', color: '#514EB5'}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{paddingBottom: 10}}>
          <Text>Sign uo using</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 50,
            width: 200,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: '#3A5998',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 99,
            }}>
            <Icon name="facebook" size={18} color="#ffffff" />
          </View>
          <View
            style={{
              height: 35,
              width: 35,
              
              backgroundColor: '#E0544B',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 99,
            }}>
        
           <Icon name="google-plus" size={18} color="#ffffff" />
          </View>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: '#0E7AB3',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 99,
            }}>
              <Icon name="linkedin" size={18} color="#ffffff" />
           
          </View>
        </View>
      </View>
    </>
  );
};

export default Welcome;
