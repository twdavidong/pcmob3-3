import React from "react";
import {Text, StyleSheet, View, TouchableOpacity, TextInput} from "react-native";

export default function AddScreen({route, navigation}) {
    const [text, setText] = useState("");

    return (
        <View style={{ flex:1, alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.label}> This is the add To Do screen         
            </Text>

            <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={(newText) => setText(newText)}></TextInput>

            <View style={styles.buttons}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.button, styles.submitButton]}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.button,styles.cancelButton]}>
                    <Text style= {styles.buttonText}>Dismiss</Text>
                </TouchableOpacity>
                </View>

                <Text style={{marginTop:40, color:"pink"}}>
                    Type here:
                </Text>
                <Text style= {{color:"#333", marginTop:10 }}>{text}</Text>
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
   });
   