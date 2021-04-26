import React from "react";
import {useState} from "react"; 
import {Text, StyleSheet, View, TouchableOpacity, TextInput} from "react-native";


export default function AddScreen({ navigation}) {
    const [text, setText] = useState("");

    /* This is the add To Do screen */
    return (
        <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.label}>Add your todo</Text>
             <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={(newText) => setText(newText)}></TextInput>

              <View style={styles.buttons}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Notes",{text})}   // from Task 8, page 162
                    style={[styles.button, styles.submitButton]}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.button,styles.cancelButton]}>
                    <Text style= {styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={(text) => navigation.deleteNote()}           // Delete feature
                    style={[styles.button,styles.deleteButton]}>
                    <Text style= {styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                </View>

                <Text style={{marginTop: 40, color: "purple" }}>Done by David Ong Teck Wee</Text>
                <Text style={{color: "#333", marginTop:10 }}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
      fontWeight: "bold",
      fontSize: 24,
    },
    textInput: {
      margin: 20,
      borderWidth: 1,
      width: "80%",
      padding: 10,
      borderColor: "#ccc",
    },
    buttons: {
      flexDirection: "row",
    },
    button: {
      padding: 10,
      margin: 5,
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
    submitButton: {
      backgroundColor: "pink",
    },
    cancelButton: {
      backgroundColor: "aquamarine",
    },
    deleteButton: {
      backgroundColor: "maroon",
    },
   });
   