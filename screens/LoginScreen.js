import { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(""); // State to store the username
  const [password, setPassword] = useState(""); // State to store the password
  const [remember, setRemember] = useState(false); // State to manage the "Remember Me" checkbox

  // Function to handle the login process
  const handleLogin = () => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("remember: ", remember);

    if (remember) {
      // Save user information securely if "Remember Me" is checked
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username,
          password
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      // Delete stored user information if "Remember Me" is unchecked
      SecureStore.deleteItemAsync("userinfo").catch((error) => console.log('Could not delete user info', error));
    }
  };

  // Effect to load stored user information when the component mounts
  useEffect(() => {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        setUsername(userinfo.username);
        setPassword(userinfo.password);
        setRemember(true);
      }
    });
  }, []);

  // Render the login form
  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        value={username}
        onChangeText={(username) => setUsername(username)}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <CheckBox
        title="Remember Me"
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button color="#5637DD" title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

// Styles for the LoginScreen component
const styles = StyleSheet.create({  
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formInput: {
    margin: 20,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formIcon: {
    marginRight: 10,
  },
  formButton: {
    margin: 60,
  }
});

export default LoginScreen;