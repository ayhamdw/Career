import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity,TextInput } from "react-native";
import React from "react";
import { COLORS } from "@/assets/styles/Dimensions";

const HomePage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.infoNav}>
          <View style={styles.info}>
            <Text>Username</Text>
            <Text>Another information</Text>
          </View>

          <Image source={require('../../assets/images/HomePage/userIcon.png')} style={{width:50,height:50}}></Image>
        </View>
        <View style={styles.filterSection}>
          <View style={styles.searchSection}>
            <Image source={require('../../assets/images/HomePage/searchIcon.png')} style={{width:20,height:20}}></Image>
            <TextInput style={styles.Input} placeholder="Search"/>
          </View>
          
          <TouchableOpacity style={styles.filterButton} >
            <Image source={require('../../assets/images/HomePage/filterSearchIcon.png')} style={{width:45,height:45,borderRadius:13}}></Image>
          </TouchableOpacity>
        </View>
      
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container:{
    marginTop:10,
    width:"95%",
    // backgroundColor:"red",
    margin:"auto",
    maxWidth:500
  },
  infoNav:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between"

  },
  info:{
    flex:1,
    gap:10,
  },


  filterSection:{
    width:"100%",
    // flex:1,
    flexDirection:"row",
    marginTop:40,
    justifyContent:"space-between",
    alignItems:"center",
    height:45,
    // backgroundColor:"teal"

  },
  searchSection:{
    // flex:1,
    // backgroundColor:"green",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    width:"85%",
    gap:10,
    // height:45,
  },
  Input:{
    width:"90%",
    height:39,
    borderBottomWidth:0,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:COLORS.introductionColor,
    backgroundColor:"#f0f0f0",
    paddingLeft:15
  },

  filterButton:{
    // backgroundColor:"red",
    // width:45,
    // display:"flex",
    // justifyContent:"center",
    // alignItems:"center",
    // alignContent:"center",
    // gap:-5,
    // height:"100%",
    
    // borderRadius:5
  },



});
