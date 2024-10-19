import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

interface OrderItem {
  id: string;
  time: string;
  orderNumber: string;
  status: "Delivered" | "Cancelled";
  items: { name: string; quantity: number; price: string; image: string }[];
}

const Applied_Jobs: React.FC = () => {
  const [currentOrders, setCurrentOrders] = useState<OrderItem[]>([
    {
      id: "1",
      time: "23/10/2023 00:09",
      orderNumber: "166 (5266166)",
      status: "Delivered",
      items: [
        {
          name: "Cocktail Juice",
          quantity: 1,
          price: "₪10",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Strawberry Juice",
          quantity: 1,
          price: "₪12",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
  ]);

  const [previousOrders, setPreviousOrders] = useState<OrderItem[]>([
    {
      id: "2",
      time: "23/10/2023 23:39",
      orderNumber: "165 (5266165)",
      status: "Cancelled",
      items: [
        {
          name: "Mango & Pineapple Mix",
          quantity: 1,
          price: "₪14",
          image: "https://via.placeholder.com/50",
        },
        {
          name: "Fajita Fries",
          quantity: 1,
          price: "₪10",
          image: "https://via.placeholder.com/50",
        },
      ],
    },
  ]);

  const renderOrder = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderNumber}>Order Number: {item.orderNumber}</Text>
      <Text>Time: {item.time}</Text>
      <Text>Status: {item.status}</Text>
      <FlatList
        data={item.items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View>
              <Text>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: {item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Orders</Text>
      <FlatList
        data={currentOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No current orders</Text>}
      />

      <Text style={styles.header}>Previous Orders</Text>
      <FlatList
        data={previousOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No previous orders</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
  },
  orderContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default Applied_Jobs;
