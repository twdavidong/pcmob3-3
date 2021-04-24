import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer} from "@react-naviagtion/native";
import Constants from 'expo-constants';
import * as SQLite from "expo-sqlite";
import NotesStack from "./screens/NotesStack"
import AddScreen from "./screens/AddScreen"

const Stack = createStackNavigator();

const db = SQLite.openDatabase("notes.db");

function NotesScreen({navigation}) {
    return <View style={styles.container}></View>;
}


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator modal="modal" headerMode= "none">
          <Stack.Screen 
            name="Notes Stack"
            component={NotesStack}
              options={{ headerShown: false
                }}
          />    
              <Stack.Screen name="Add Note" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}