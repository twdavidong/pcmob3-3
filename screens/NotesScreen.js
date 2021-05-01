/*  original working */
import React from "react";
import {useState} from "react"; 
import {useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons"; 

import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

console.log(FileSystem.documentDirectory);

const db = SQLite.openDatabase("notes.db");

// default current state cat and elephant or "" always run first time....
export default function NotesScreen({ route, navigation }) {
    const [notes, setNotes] = useState([]);

        // final brackets for useState pg 171 Task 9
  function refreshNotes() {
        db.transaction((tx) => {
            tx.executeSql(
              "SELECT * FROM notes", null, (txObj, { rows: { _array } }) => setNotes(_array), (txObj, error) => console.log("Error ", error));
    });
  } // close refreshNotes function

      useEffect(() =>  {
        db.transaction(
            (tx) => {
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INT);'
          );    // pg 170 Task 9
        }, null, refreshNotes);   // pg 171  Task 9
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
          }}, [route.params?.text]); // close useEffect for new Note

  function addNote() {
      navigation.navigate("Add Note");
      }
    
    // Montior route.params for changes and add items to the database
    // pg 173
    useEffect(() => {    
          if (route.params?.text) {
              db.transaction( 
                (tx) => {
                tx.executeSql(
                  "INSERT INTO notes (done, title) VALUES (0, ?)"
                , [route.params.text,]);
                }, null, refreshNotes);
          }
      },  [route.params?.text]);  // closing for Insert Notes

      deleteNote = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM notes WHERE id=?',[id]);             
        }, null, refreshNotes);
      }      
  

    function renderItem({item}) {
      return (
        <View style={{    
                padding: 10,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,           
                flexDirection:"row",     
                justifyContent:"space-between",
        }}
      ><Text style={{textAlign: "left", fontSize: 16, }}>{item.title}</Text><View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => this.deleteNote(item.id)}>
      <AntDesign
        name="close"
        size={16}
        color="black"
      /></TouchableOpacity></View>
        </View>
      );
    }   // closing for renderItem function    


  
        // whatever from the useState would go the return below...
      return (      // return  to the useState
            <View style={styles.container}>
              <FlatList
                style={{width:"100%"}}
                data={notes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
        ); // closing for return...
}      // final bracket for NotesScreen function
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffccff",
    alignItems: "center",
    justifyContent: "center",
  }, buttonContainer: {
    
    
   }
 });