import {ImageBackground, StyleSheet} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';

export default () => {
  return StyleSheet.create({
    //    modal styling
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      maxWidth: 400,
      maxHeight: 600,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    saveButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    saveButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    BackgroundImg: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'lightpink',
    },
    //   flatlist styling
    mainviewFlatlist: {
      flex: 9,
      paddingTop: 20,
      paddingHorizontal: 10,
    },
    mainTextviex: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    viewflatlist: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 16,
      flexDirection: 'row',
    },
    imgflatlist: {
      width: 80,
      height: 80,
      borderRadius: 5,
      // marginTop:50
    },
    deleteButton: {
      borderRadius: 25,
      height: 40,
      width: 50,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      //   marginRight: 40,
      //   marginTop: 5,
    },
    deleteTextbutton: {
      fontSize: 15,
      fontWeight: '600',
      color: '#514EB5',
    },
    editButton: {
      borderRadius: 25,
      height: 40,
      width: 100,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 40,
      marginTop: 15,
    },
    editTextButton: {
      fontSize: 15,
      fontWeight: '600',
      color: '#514EB5',
    },
    // mainButton
    maintopview: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flex: 1,
    },
    AddProductButton: {
      borderRadius: 25,
      height: 30,
      width: 80,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    AddProductText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#3ABCFF',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 1,
    },
    paragraph: {
      fontSize: 10,
      marginBottom: 2,
    },
    price: {
      fontSize: 15,
      color: '#41BDFF',
    },
  });
};
