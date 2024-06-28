// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import axios from 'axios';

// const Student = ({ route }) => {
//   const { enrollNo } = route.params;
//   const [studentData, setStudentData] = useState(null);

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5076/api/Student/ByEnrollNo/${enrollNo}`);
//         setStudentData(response.data);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       }
//     };

//     fetchStudentData();
//   }, [enrollNo]);

//   return (
//     <View style={styles.container}>
//       {studentData ? (
//         <>
//           <Text>Name: {studentData.name}</Text>
//           <Text>Father's Name: {studentData.fatherName}</Text>
//           <Text>Roll No: {studentData.rollNo}</Text>
//           {/* Display other profile information as needed */}
//         </>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Student;

{/* This is Student Report 

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const Student = ({ route, navigation }) => {
  const { enrollNo } = route.params || {};
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enrollNo) {
      fetch(`http://localhost:5076/api/Student/ByEnrollNo/${enrollNo}`)
        .then(response => response.json())
        .then(data => {
          setStudentData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching student data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [enrollNo]);

  const tableHead = ['Subject', 'PT2', 'Sub', 'Yearly', 'PT1', 'T.Marks'];
  const subjects = [
    'GEN KNOWLEDGE', 'SCIENCE', 'ENGLISH I', 'ENGLISH II', 'HINDI I',
    'HINDI II', 'COMPUTER', 'SANSKRIT', 'MATHEMATICS', 'SOCIAL STUDIES', 'T.Marks'
  ];

  const createTableData = () => {
    if (!studentData) return [];

    const data = subjects.map(subject => {
      const pt2 = studentData.studentmarks.find(mark => mark.exam === 'PT2')[subject.toLowerCase().replace(/ /g, '')] || '';
      const sub = studentData.studentmarks.find(mark => mark.exam === 'Sub')[subject.toLowerCase().replace(/ /g, '')] || '';
      const yearly = studentData.studentmarks.find(mark => mark.exam === 'Yearly')[subject.toLowerCase().replace(/ /g, '')] || '';
      const pt1 = studentData.studentmarks.find(mark => mark.exam == 'PT1')[subject.toLowerCase().replace(/ /g, '')] || '';
      const tMarks = pt2 + sub + yearly + pt1;

      return [subject, pt2, sub, yearly, pt1, tMarks];
    });

    return data;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!studentData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load student data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Report</Text>
      <Text style={styles.text}>Name: {studentData.name}</Text>
      <Text style={styles.text}>Enrollment No: {studentData.enrollNo}</Text>
      <Text style={styles.text}>Father's Name: {studentData.fatherName}</Text>
      <Text style={styles.text}>Roll No: {studentData.rollNo}</Text>

      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={createTableData()} textStyle={styles.text} />
      </Table>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  errorText: { fontSize: 16, color: 'red' }
});

export default Student;

*/}

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const Student = ({ route, navigation }) => {
  const { enrollNo } = route.params || {};
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enrollNo) {
      fetch(`http://localhost:5076/api/Student/ByEnrollNo/${enrollNo}`)
        .then(response => response.json())
        .then(data => {
          setStudentData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching student data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [enrollNo]);

  const tableHead = ['Subject', 'PT2', 'Sub', 'Yearly', 'PT1','T.Marks'];
  const subjects = [
    'genKnowledge', 'science', 'englishI', 'englishII', 'hindiI',
    'hindiII', 'computer', 'sanskrit', 'mathematics', 'socialStudies'
  ];
  const subjectLabels = [
    'GEN KNOWLEDGE', 'SCIENCE', 'ENGLISH I', 'ENGLISH II', 'HINDI I',
    'HINDI II', 'COMPUTER', 'SANSKRIT', 'MATHEMATICS', 'SOCIAL STUDIES'
  ]; 

  const createTableData = () => {
    if (!studentData) return [];

    const data = subjects.map((subject, index) => {
      const pt2 = studentData.studentmarks.find(mark => mark.exam === 'PT2')[subject] || 0;
      const sub = studentData.studentmarks.find(mark => mark.exam === 'Sub')[subject] || 0;
      const yearly = studentData.studentmarks.find(mark => mark.exam === 'Yearly')[subject] || 0;
      const pt1 = studentData.studentmarks.find(mark => mark.exam == 'PT1')[subject.toLowerCase().replace(/ /g, '')] || '';
      const tMarks = pt2 + sub + yearly + pt1;

      return [subjectLabels[index], pt2, sub, yearly,pt1, tMarks];
    });

    return data;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!studentData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load student data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Report</Text>
      <Text style={styles.text}>Name: {studentData.name}</Text>
      <Text style={styles.text}>Enrollment No: {studentData.enrollNo}</Text>
      <Text style={styles.text}>Father's Name: {studentData.fatherName}</Text>
      <Text style={styles.text}>Roll No: {studentData.rollNo}</Text>

      <ScrollView>
        <View>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={createTableData()} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  errorText: { fontSize: 16, color: 'red' }
});

export default Student;


