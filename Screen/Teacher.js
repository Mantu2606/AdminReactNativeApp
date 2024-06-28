import React, { useState } from 'react';
import { View, Text, Button, TextInput, Picker } from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

const Teacher = () => {
    const [filePath, setFilePath] = useState('');
    const [selectedSheet, setSelectedSheet] = useState('');
    const [data, setData] = useState([]);

    const handleFileSelection = async (event) => {
        const { uri } = event.nativeEvent; // Get the file URI from the event
        const fileString = await RNFS.readFile(uri, 'ascii'); // Read the file as a string
        const workbook = XLSX.read(fileString, { type: 'binary' }); // Parse the Excel data

        const sheetNames = workbook.SheetNames; // Get the sheet names
        setSelectedSheet(sheetNames[0]); // Set the first sheet as default

        const worksheet = workbook.Sheets[selectedSheet]; // Get the chosen worksheet
        const formattedData = XLSX.utils.sheet_to_array(worksheet); // Convert worksheet to array
        setData(formattedData);
    };

    const handleSheetChange = (itemValue) => setSelectedSheet(itemValue);

    return (
        <View>
            <Text>Select Excel File:</Text>
            <TextInput value={filePath} onChangeText={setFilePath} editable={false} />
            <Button title="Choose File" onPress={() => { /* File picker implementation */} } />
            {filePath && (
                <>
                    <Text>Select Sheet:</Text>
                    <Picker selectedValue={selectedSheet} onValueChange={handleSheetChange}>
                        {workbook.SheetNames.map((sheetName) => (
                            <Picker.Item key={sheetName} label={sheetName} value={sheetName} />
                        ))}
                    </Picker>
                </>
            )}
            {data.length > 0 && (
                <View>
                    <Text>Excel Data:</Text>
                    {/* Render your data here, e.g., using a FlatList or SectionList */}
                </View>
            )}
        </View>
    );
};

export default Teacher;

