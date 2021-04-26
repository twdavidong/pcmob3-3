/*  original working */
import React from "react";
import {useState} from "react"; 
import {useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 

import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

console.log(FileSystem.documentDirectory);

const db = SQLite.openDatabase("notes.db");

// default current state cat and elephant or "" always run first time....
export default function NotesScreen({ route, navigation }) {
    const [notes, setNotes] = useState([]);

    // final brackets for useState
  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM notes", null, (txObj, { rows: { _array } }) => setNotes(_array), (txObj, error) => console.log("Error ", error)
      );
    });
  } // close refreshNotes function

    useEffect(() =>  {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INT);'
          );
        }, null, refreshNotes);
    },[]);  // close useEffect for creating Table

   


// This is to set up the top right button  pg 153  Task 6
      useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={addNote}>
            <Entypo
              name="new-message"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      });
    }); // close useEffect for add Note

        // Task 8, pg 163
        useEffect(()  => {
          if (route.params?.text) {
            const newNote = {
              title: route.params.text,
              done: false,
              id: notes.length.toString(),
              };
              setNotes([...notes, newNote]);
          }},[route.params?.text]); // close useEffect for new Note

    function addNote() {
      navigation.navigate("Add Note");
      }
    
    // Montior route.params for changes and add items to the database
    useEffect(() => {
      if (route.params?.text) {
        db.transaction( // pg 173
          (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [route.params.text,]);
        }, null, refreshNotes);
      }
    },[route.params?.text]);  // closing for Insert Notes
   


// This is to add Delete button =======================================================================================================
/* useEffect(() => {
  navigation.setOptions({
    marginRight: () => (
      <TouchableOpacity onPress={deleteNote}>
        <AntDesign
          name="Delete"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    ),
  });
}); // close useEffect for add Note
*/
    // Delete item
    useEffect(() => {
      if (route.params?.text) {
        db.transaction(
          (tx) => {
          tx.executeSql("DELETE FROM notes WHERE id=?;",[id]);
        }, null, refreshNotes);
      }
    },);  // close useEffect for Delete Notes from SQLite

    function deleteNote(item) {
      navigation.navigate("Delete Note");
      }  

//  =======================================================================================================

    function renderItem({}) {
      return (
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          }}
        > <TouchableOpacity onPress={deleteNote}>
        <AntDesign
          name="Delete"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
        </View>
      );
    }   // closing for renderItem function
  
  
                // whatever from the useState would go the return below...
  return (      // return  to the useState
    <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
       keyExtractor={(item) => item.id}
      />
    </View>
  ); // closing for return...


}      // final } for NotesScreen function

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
 });
 
 



 





 

/*

import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import {Entypo} from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

export default function NotesScreen({navigation, route}) {
  const [notes, setNotes] = useState([,]);
 
    function refreshNotes() {
        db.transaction((tx) => {tx.executeSql("SELECT * FROM notes", null, (txObj, { rows: { _array} }) => setNotes(_array), (txObj, error) => console.log("Error: ", error));});
    }

    // This is to set up  the database on first run
    useEffect(()    => {
        db.transaction(
            (tx) => {tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INT);');},null,refreshNotes);
        }, []);

// This is to set up the top right button
useEffect(() =>   {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={addNote}>
                <Entypo
                    name="ios-create-outline"
                    size={30}
                    color="black"
                    style={{
                        color:"#f55",
                        marginRight:10,
                    }}
                />
            </TouchableOpacity>
        ),
    });    
});


function addNote() {
  navigation.navigate("Add Note");
}


 

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});



// Montior route.params for changes and add items to the database
useEffect(()    => {
    if(route.params?.text)  {
        db.transaction((tx) => {tx.executeSql("INSERT INTO notes (done, title) VALUE (0, ?)",[route.params.text,]);}, null, refreshNotes);}}, [route.params?.text]);
}


*/