import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const OrderHistory = () => {
  const navigation = useNavigation();
  const orderHistory = useSelector(state => state.cart.orderHistory);

  return (
    <>
     <Appbar.Header style={{backgroundColor:'#3ABCFF'}}>
    <Appbar.BackAction  onPress={() => navigation.navigate('Cart')} />
    <Appbar.Content title="OrderHistory" />
   
  </Appbar.Header>
   
 
    <ScrollView style={styles.container}>
      {orderHistory.map((order, index) => (
        <View key={index} style={styles.orderContainer}>
          <Text style={styles.orderTitle}>Order #{index + 1}</Text>
          {order.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.itemContainer}>
              <Text style={styles.itemText}>Name: {item.name}</Text>
              <Text style={styles.itemText}>Price: ${parseFloat(item.price).toFixed(2)}</Text>
              <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemText}>Total: ${parseFloat(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>
      ))}
      
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  orderContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default OrderHistory;
