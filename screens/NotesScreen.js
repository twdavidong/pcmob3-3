import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import {Entypo} from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

export default function NotesScreen({route, navigation}) {
    const [notes, setNotes] = useState([]);

    function refreshNotes() {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM notes",
                null,
                (txObj, { rows: { _array} }) => setNotes(_array),
                (txObj, error) => console.log("Error: ", error)
            );
        });
    }

    // This is to set up  the database on first run
    useEffect(()    => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INT);'
                );
            },null,refreshNotes);
        }, []);

// This is to set up the top right button
useEffect(() =>   {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={addNote}>
                <Ionicons
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

// Montior route.params for changes and add items to the database
useEffect(()    => {
    if(route.params?.text)  {
        db.transaction(
            (tx) => {
                tx.executeSql("INSERT INTO notes (done, title) VALUE (0, ?)",[
                    route.params.text,
                ]);
            }, null, refreshNotes);
            }
        },  [route.params?.text]);
}

