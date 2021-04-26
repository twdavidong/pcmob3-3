import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer} from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Constants from 'expo-constants';

import NotesStack from "./screens/NotesStack"
import AddScreen from "./screens/AddScreen"



const Stack = createStackNavigator();

function NotesScreen({navigation}) {
    return <View style={styles.container}></View>;
}                                                                     

export default function App() {         // Here, modal stack will call for NotesStacks and AddScreen, note that NotesStacks will call for NotesScreena
  return (
      <NavigationContainer>
        <Stack.Navigator mode="modal" headerMode= "none">  
          <Stack.Screen 
            name="Notes Stack" 
            component={NotesStack}   
            options={{ headerShown: false}} /> 
          <Stack.Screen 
            name="Add Note" 
            component={AddScreen} />  
        </Stack.Navigator>
      </NavigationContainer>
  );
}