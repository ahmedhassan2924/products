// Cart.js
import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Alert} from 'react-native';
import {updateQuantity, placeOrder} from '../Redux/cartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {updateProductQuantity} from '../Redux/productSlice';
import { Appbar } from 'react-native-paper';
import { handleIncreaseQuantity } from '../functions/GlobalFunction';

const Cart = () => {
  // Sample cart items
  const cartItem = useSelector(state => state.cart.cartItem);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // Function to handle quantity updates
 

  // Handle decrease in quantity
  const handleDecreaseQuantity = id => {
    dispatch(updateQuantity({id, delta: -1}));
  };
  const getTotalPrice = () => {
    return cartItem
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 0;
        return total + itemPrice * itemQuantity;
      }, 0)
      .toFixed(2);
  };
  const handlePlaceOrder = () => {
    // dispatch(updateProductQuantity(cartItem));
    dispatch(placeOrder());
    navigation.navigate('OrderHistory'),
      Alert.alert('Order placed successfully!');
  };

  return (
    <>
    <Appbar.Header style={{backgroundColor:'#3ABCFF'}}>
    <Appbar.BackAction  onPress={() => navigation.navigate('Products')} />
    <Appbar.Content title="Cart" />
   
  </Appbar.Header>

    <ScrollView style={styles.container}>
      {cartItem.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>
            ${parseFloat(item.price).toFixed(2)}
          </Text>

          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => handleDecreaseQuantity(item.id)} />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Button
              title="+"
              onPress={() => handleIncreaseQuantity(item.id, item.productId)}
            />
          </View>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${getTotalPrice()}</Text>
      </View>
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  AddProductButton: {
    borderRadius: 25,
    height: 40,
    width: 100,
    backgroundColor: 'darkblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  AddProductText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
});


export default Cart;
