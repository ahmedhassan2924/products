import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function ExampleSheet() {
  let options = {
    saveToPhotos: true,
    mediaType: 'photos',
  };
  const opencamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);

      SheetManager.hide('example-sheet', {payload: result.assets[0]});
    }
  };
  const opengallery = async () => {
    const result = await launchImageLibrary(options);
    SheetManager.hide('example-sheet', {payload: result.assets[0]});
  };

  return (
    <ActionSheet containerStyle={{height: '30%', width: '95%'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 40,
            width: 200,
            backgroundColor: '#514EB5',
            alignItems: 'center',
            justifyContent: 'center',

            marginTop: 25,
          }}
          onPress={opencamera}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Open Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 40,
            width: 200,
            backgroundColor: '#514EB5',
            alignItems: 'center',
            justifyContent: 'center',

            marginTop: 25,
          }}
          onPress={opengallery}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Open Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 40,
            width: 200,
            backgroundColor: 'lightgrey',
            alignItems: 'center',
            justifyContent: 'center',

            marginTop: 25,
          }}
          onPress={() => SheetManager.hide('example-sheet')}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: '#514EB5',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

export default ExampleSheet;
