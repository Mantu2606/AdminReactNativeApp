// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';

// //npm install @react-native-picker/picker 

// const Home = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [selectedRole, setSelectedRole] = useState('Admin'); // Default value can be Admin
 
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5076/api/WphAuthentication/CheckCredentials', {
//         Email: username,
//         enrollNo:username,
//         Password: password,
//       });
//       console.log(response.data);  
//       const { role, isAuthenticated,enrollNo } = response.data;

//       if (isAuthenticated) {
//         switch (role) {
//           case 'Admin':
//             navigation.navigate('adminProfile');
//             break;
//           case 'Teacher':
//             navigation.navigate('teacherProfile');
//             break;
//           case 'Student':
//             navigation.navigate('studentProfile');
//             break;
//           default:
//             Alert.alert('Invalid role');
//         }
//       } else {
//         Alert.alert('Authentication failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'Invalid username or password');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login</Text>
//       <Picker
//         selectedValue={selectedRole}
//         style={styles.picker}
//         onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
//       >
//         <Picker.Item label="Admin" value="Admin" />
//         <Picker.Item label="Teacher" value="Teacher" />
//         <Picker.Item label="Student" value="Student" />
//       </Picker>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Email or EnrollId"
//         value={username}
//         onChangeText={text => setUsername(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={text => setPassword(text)}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4FD3DA',
//   },
//   picker: {
//     width: '80%',
//     backgroundColor: 'lightgrey', // Change background color here
//     marginBottom: 10,
//     color:"black"
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   picker: {
//     width: '80%',
//     marginBottom: 10,
//   },
// });

// export default Home;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Admin');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5076/api/WphAuthentication/CheckCredentials', {
        Email: username,
        enrollNo: username,
        Password: password,
      });
      console.log(response.data);
      const { role, isAuthenticated, enrollNo } = response.data;

      if (isAuthenticated) {
        switch (role) {
          case 'Admin':
            navigation.navigate('adminProfile');
            break;
          case 'Teacher':
            navigation.navigate('teacherProfile');
            break;
          case 'Student':
            navigation.navigate('studentProfile', { enrollNo });
            break;
          default:
            Alert.alert('Invalid role');
        }
      } else {
        Alert.alert('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Picker
        selectedValue={selectedRole}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
      >
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Teacher" value="Teacher" />
        <Picker.Item label="Student" value="Student" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enter Email or EnrollId"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4FD3DA',
  },
  picker: {
    width: '80%',
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    color: 'black'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Home;
