import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import createStyles from '../styles/mainstyles';
import {Avatar} from '../assets';
import {SheetManager} from 'react-native-actions-sheet';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCameraPhoto,
  setDescription,
  setIsEdit,
  setModalVisible,
  setName,
  setPrice,
  setSelectedProduct,
  setProducts,
  setQuantity,
  deleteProduct,
  updateProductQuantity,
} from '../Redux/productSlice';
import {setCartItems} from '../Redux/cartSlice';
import {generateUniqueId} from '../functions/GlobalFunction';
import {IconButton} from 'react-native-paper';
import {Card} from 'react-native-paper';
import {Appbar} from 'react-native-paper';

const Products = () => {
  const currentUser = auth().currentUser;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const styles = createStyles();

  const products = useSelector(state => state.product.products);

  const name = useSelector(state => state.product.name);

  const quantity = useSelector(state => state.product.quantity);

  const price = useSelector(state => state.product.price);

  const cameraPhoto = useSelector(state => state.product.cameraPhoto);

  const modalVisible = useSelector(state => state.product.modalVisible);

  const selectedProduct = useSelector(state => state.product.selectedProduct);

  const isEdit = useSelector(state => state.product.isEdit);

  const description = useSelector(state => state.product.description);
  const cartItem = useSelector(state => state.cart.cartItem);

  

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Products')
      .where('userId', '==', currentUser.uid)
      .onSnapshot(querySnapshot => {
        const products = [];
        querySnapshot.forEach(documentSnapshot => {
          products.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        dispatch(setProducts(products));
      });

    return () => unsubscribe();
  }, [currentUser.uid]);

  const handelClose = () => {
    dispatch(setModalVisible(false));

    dispatch(setSelectedProduct(null));
  };
  const handleProduct = () => {
    dispatch(setModalVisible(true));
    dispatch(setIsEdit(false));
    dispatch(setName(''));
    dispatch(setQuantity(''));
    dispatch(setPrice(''));
    dispatch(setDescription(''));
    dispatch(setCameraPhoto(null));
  };

  const saveProduct = async () => {
    setLoading(true);
    try {
      if (!cameraPhoto) {
        console.log('image is null');
        return;
      }
      const reference = storage().ref(cameraPhoto.fileName);
      const pathToFile = cameraPhoto.uri;

      await reference.putFile(pathToFile);
      const downloadURL = await reference.getDownloadURL();

      const product = {
        name,
        quantity: parseInt(quantity),
        price: parseInt(price),
        description,
        imageUrl: downloadURL,
        userId: currentUser.uid,
      };

      if (isEdit && selectedProduct) {
        console.log(selectedProduct, 'photos');

        await firestore()
          .collection('Products')
          .doc(selectedProduct.id)
          .update(product);

        console.log('Product updated!');
      } else {
        const product = {
          name,
          quantity: parseInt(quantity),
          price: parseInt(price),
          description,
          imageUrl: downloadURL,
          userId: currentUser.uid,
          id: generateUniqueId(),
        };
        await firestore().collection('Products').doc(product.id).set(product);
        console.log('Product added!');
      }
    } catch (error) {
      console.error('Error saving product: ', error);
    } finally {
      setLoading(false);
      dispatch(setModalVisible(false));

      dispatch(setSelectedProduct(null));
    }
  };

  const handleDeleteProduct = async productId => {
    firestore()
      .collection('Products')
      .doc(productId)
      .delete()
      .then(() => {
        console.log('Product deleted!');
      });
    dispatch(deleteProduct(productId));
  };

  const handleEditButton = item => {
    dispatch(setSelectedProduct(item));
    dispatch(setIsEdit(true));
    dispatch(setName(item.name));
    dispatch(setQuantity(item.quantity));
    dispatch(setPrice(item.price));
    dispatch(setDescription(item.description));
    dispatch(setModalVisible(true));
  };
  const addToCart = (item) => {
    if (item.quantity == 0) {
      Alert.alert('Out of Stock!');
      return;
    }
    Alert.alert(
      'Add to cart',
      'Are you sure you want to add this product?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(setCartItems(item));
          
            dispatch(updateProductQuantity(cartItem));
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <>
      <Appbar.Header style={{backgroundColor: '#3ABCFF'}}>
        <Appbar.BackAction
          style={{}}
          onPress={() => navigation.navigate('Home')}
        />
        <View style={styles.maintopview}>
          <Text style={styles.mainTextviex}>Products:</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '55%',
            }}>
            <TouchableOpacity
              style={styles.AddProductButton}
              onPress={handleProduct}>
              <Text style={styles.AddProductText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.AddProductButton}
              onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.AddProductText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Appbar.Header>

      <View style={styles.mainviewFlatlist}>
        <FlatList
          data={products}
          renderItem={({item, index}) => (
            <Card
              contentStyle={{flexDirection: 'row'}}
              style={{
                elevation: 3,
                // marginLeft: 5,
                width: '95%',

                height: 110,
                alignItems: 'center',

                display: 'flex',
                marginBottom: 10,
                // justifyContent:'center'
              }}>
              <View style={{marginLeft: 50, marginTop: 5}}>
                <Image
                  style={styles.imgflatlist}
                  source={item.imageUrl ? {uri: item.imageUrl} : Avatar}
                />
              </View>

              <View style={{height: '70%', marginLeft: 5}}>
                <Text style={styles.title}> {item.name}</Text>
                <Text style={styles.paragraph}>Quantity: {item.quantity}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.paragraph}>
                  Description: {item.description}
                </Text>
              </View>

              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 50,
                    justifyContent: 'space-around',
                    marginTop: 5,

                    width: '52%',
                  }}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      Alert.alert(
                        'Delete User',
                        'Are you sure you want to delete this user?',
                        [
                          {text: 'Cancel', style: 'cancel'},
                          {
                            text: 'Delete',
                            onPress: () => handleDeleteProduct(item.id),
                          },
                        ],
                        {cancelable: true},
                      );
                    }}>
                    <IconButton icon="delete" iconColor="red" size={24} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleEditButton(item)}>
                    <Text style={styles.editTextButton}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: 55}}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      addToCart(item);
                    }}>
                    <Text style={styles.editTextButton}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          )}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          dispatch(setModalVisible(false));
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEdit ? 'Edit Product' : 'Add Product'}
            </Text>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() =>
                SheetManager.show('example-sheet').then(res => {
                  dispatch(setCameraPhoto(res));
                })
              }>
              <Image
                style={styles.BackgroundImg}
                source={
                  cameraPhoto
                    ? cameraPhoto
                    : selectedProduct?.imageUrl
                    ? {uri: selectedProduct.imageUrl}
                    : Avatar
                }
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={text => dispatch(setName(text))}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              value={quantity}
              onChangeText={text => dispatch(setQuantity(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={text => dispatch(setPrice(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, {height: 100}]}
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={text => dispatch(setDescription(text))}
            />

            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButton]} // Apply styles conditionally
              onPress={saveProduct}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Product</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={handelClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Products;
