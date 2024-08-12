import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from '../assets';
import {SegmentedButtons} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import {SheetManager} from 'react-native-actions-sheet';
import {useNavigation} from '@react-navigation/native';

import {IconButton} from 'react-native-paper';
const Home = () => {
  const [users, setUsers] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editName, setEditName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeStatus, setActiveStatus] = useState('active');
  const [cameraPhoto, setCameraPhoto] = useState(null);

  const navigation = useNavigation();

  //  logout function

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('Users').get();
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);
  // delete function

  const deleteUser = async (userId: any) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const editUser = async item => {
    setModalVisible(true);
    setSelectedUser(item);
    setEditName(item.name);
  };
  // edit funtion

  const editUserName = async () => {
    try {
      await firestore().collection('Users').doc(selectedUser.id).update({
        name: editName,
      });

      const newUser = {...selectedUser, name: editName};

      const index = users.findIndex(user => user.id === selectedUser.id);

      const updatedUsers = [
        ...users.slice(0, index),
        newUser,
        ...users.slice(index + 1),
      ];

      setUsers(updatedUsers);

      setEditingUserId(null);
      setEditName('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error editing user name: ', error);
    }
  };

  const uploadFileToFirebase = async () => {
    try {
      if (!cameraPhoto) {
        console.log('image is null');
        return;
      }
      const reference = storage().ref(cameraPhoto.fileName);
      const pathToFile = cameraPhoto.uri;

      await reference.putFile(pathToFile);
      const downloadURL = await reference.getDownloadURL();
      await firestore()
        .collection('Users')
        .doc(selectedUser.id)
        .update({
          imageUrl: downloadURL,
        })
        .then(() => {
          console.log('User updated!');
        });
      console.log(downloadURL, 'dd');
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw error;
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 40,
            width: 80,
            backgroundColor: '#514EB5',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Products')}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 40,
            width: 80,
            backgroundColor: '#514EB5',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={logout}>
          {/* <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Log out
          </Text> */}
          <IconButton icon="logout" iconColor='white' size={24} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 9, paddingTop: 20, paddingHorizontal: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
          List of Users:
        </Text>
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
          <SegmentedButtons
            value={activeStatus}
            onValueChange={setActiveStatus}
            buttons={[
              {label: 'Active', value: 'active'},
              {label: 'Inactive', value: 'inactive'},
            ]}
          />
        </SafeAreaView>

        <FlatList
          data={users}
          extraData={editingUserId}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                marginBottom: 10,
                padding: 10,
                backgroundColor: '#f0f0f0',
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text>Name: {item.name}</Text>
                <Text>Email: {item.email}</Text>
              </View>
              <Text
                style={{
                  marginLeft: 'auto',
                  marginRight: 10,
                  color: activeStatus == 'active' ? 'green' : 'red',
                }}>
                {activeStatus == 'active' ? 'Active' : 'Inactive'}
              </Text>
              <View>
                <TouchableOpacity
                  style={{
                    borderRadius: 25,
                    height: 40,
                    width: 70,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 40,
                    marginTop: 5,
                  }}
                  onPress={() => {
                    Alert.alert(
                      'Delete User',
                      'Are you sure you want to delete this user?',
                      [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'Delete', onPress: () => deleteUser(item.id)},
                      ],
                      {cancelable: true},
                    );
                  }}>
                  {/* <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: 'white',
                    }}>
                    Delete
                  </Text> */}
                  <IconButton icon="delete" iconColor='red' size={24} />
                  {/* <Icon source="delete" color={MD3Colors.error50} size={20} /> */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 25,
                    height: 40,
                    width: 70,
                    backgroundColor: '#514EB5',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 40,
                    marginTop: 15,
                  }}
                  onPress={() => {
                    editUser(item);
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: 'white',
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {/* modaaaallll */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditingUserId(null);
          setEditName('');
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              height: '45%',
              width: '70%',
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() =>
                SheetManager.show('example-sheet').then(res => {
                  setCameraPhoto(res);
                })
              }>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'lightpink',
                }}
                source={cameraPhoto ? cameraPhoto : Avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 25,
                height: 30,
                width: 80,
                backgroundColor: '#514EB5',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={uploadFileToFirebase}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                Upload
              </Text>
            </TouchableOpacity>
            <TextInput
              style={{
                marginTop: 25,
                marginBottom: 10,
                padding: 10,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#DDDDDD',
                borderRadius: 5,
                width: '100%',
              }}
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter new name"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
              }}>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  width: 100,
                  alignItems: 'center',
                  backgroundColor: '#32CD32',
                }}
                onPress={() => editUserName()}>
                <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>Save</Text>
              </Pressable>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  width: 100,
                  alignItems: 'center',
                  backgroundColor: '#FF6347',
                }}
                onPress={() => {
                  setModalVisible(false);
                  setEditingUserId(null);
                  setEditName('');
                }}>
                <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;
