// import React, { useCallback, useState } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   FlatList,
//   useColorScheme,
//   TextInput,
// } from 'react-native';
// import axios from 'axios';
// import DocumentPicker from 'react-native-document-picker';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import RNFS from 'react-native-fs';

// function Admin() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   const [excelData, setExcelData] = useState(null);

//   const handleDocumentSelection = useCallback(async () => {
//     try {
//       const response = await DocumentPicker.pick({
//         presentationStyle: 'fullScreen',
//         type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
//       });
//       const fileToUpload = {
//         uri: response[0].uri,
//         type: response[0].type,
//         name: response[0].name,
//       };
//       const formData = new FormData();
//       formData.append('file', fileToUpload);
//       try {
//         const response = await axios.post('http://localhost:5076/api/Student/UploadExcel', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         setExcelData(response.data); // Assuming response.data contains Excel data
//       } catch (error) {
//         console.error('Upload error: ', error);
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   }, []);

//   const handleDownloadCSV = useCallback(() => {
//     if (!excelData) return;

//     const csvRows = [];
//     const headers = Object.keys(excelData[0]);
//     csvRows.push(headers.join(','));

//     excelData.forEach(row => {
//       const values = headers.map(header => row[header]);
//       csvRows.push(values.join(','));
//     });

//     const csvString = csvRows.join('\n');
//     const path = `${RNFS.DocumentDirectoryPath}/data.csv`;

//     RNFS.writeFile(path, csvString, 'utf8')
//       .then(() => {
//         console.log('CSV file written at:', path);
//         // Implement sharing or further processing of the CSV file here
//       })
//       .catch(error => {
//         console.error('Error writing CSV file:', error);
//       });
//   }, [excelData]);

//   const renderItem = ({ item }) => (
//     <View style={styles.row}>
//       {Object.values(item).map((cellData, index) => (
//         <Text key={index} style={styles.cell}>{cellData}</Text>
//       ))}
//     </View>
//   );

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <View style={styles.container}>
//         <Button title="Upload Excel" onPress={handleDocumentSelection} />
//         <ScrollView horizontal={true} style={styles.table}>
//           {excelData && (
//             <View>
//               <View style={styles.headerRow}>
//                 {Object.keys(excelData[0]).map((header, index) => (
//                   <Text key={index} style={styles.headerCell}>{header}</Text>
//                 ))}
//               </View>
//               <FlatList
//                 data={excelData}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//               />
        
//               <Button title="Download CSV" onPress={handleDownloadCSV} />
//             </View>
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   table: {
//     marginTop: 16,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     backgroundColor: '#f1f1f1',
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   headerCell: {
//     flex: 1,
//     fontWeight: 'bold',
//     padding: 8,
//     textAlign: 'center',
//   },
//   cell: {
//     flex: 1,
//     padding: 8,
//     textAlign: 'center',
//   },
// });

// export default Admin;

import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  useColorScheme,
  TextInput,
} from 'react-native';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RNFS from 'react-native-fs';

function Admin() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [textInput, setTextInput] = useState('');
  const [excelData, setExcelData] = useState(null);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
      });
      const fileToUpload = {
        uri: response[0].uri,
        type: response[0].type,
        name: response[0].name,
      };
      const formData = new FormData();
      formData.append('file', fileToUpload); 
      try {
        const response = await axios.post('http://localhost:5076/api/Student/UploadMarksExcel?exam='+textInput, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setExcelData(response.data); // Assuming response.data contains Excel data
      } catch (error) {
        console.error('Upload error: ', error);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.warn(err);
      }
    }
  }, [textInput]);

  const handleDownloadCSV = useCallback(() => {
    if (!excelData) return;

    const csvRows = [];
    const headers = Object.keys(excelData[0]);
    csvRows.push(headers.join(','));

    excelData.forEach(row => {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const path = `${RNFS.DocumentDirectoryPath}/data.csv`;

    RNFS.writeFile(path, csvString, 'utf8')
      .then(() => {
        console.log('CSV file written at:', path);
        // Implement sharing or further processing of the CSV file here
      })
      .catch(error => {
        console.error('Error writing CSV file:', error);
      });
  }, [excelData]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {Object.values(item).map((cellData, index) => (
        <Text key={index} style={styles.cell}>{cellData}</Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter text"
          value={textInput}
          onChangeText={setTextInput}
        />
        <Button title="Upload Excel" onPress={handleDocumentSelection} />
        <ScrollView horizontal={true} style={styles.table}>
          {excelData && (
            <View>
              <View style={styles.headerRow}>
                {Object.keys(excelData[0]).map((header, index) => (
                  <Text key={index} style={styles.headerCell}>{header}</Text>
                ))}
              </View>
              <FlatList
                data={excelData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
              {/* <Button title="Download CSV" onPress={handleDownloadCSV} /> */}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  table: {
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f1f1f1',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
});

export default Admin;
