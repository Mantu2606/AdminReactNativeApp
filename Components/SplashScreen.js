import React, { useEffect } from 'react';
import { View,Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
           navigation.navigate('home'); // Navigate to the next screen after 5 seconds
        }, 2000); // 5000 milliseconds = 5 seconds
    }, [navigation]);  
    return (
       
        <View style={{ flexDirection: 'column', height: '100%', width: "100%",backgroundColor: '#FFFDD0', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={require('../assests/ilakshyalogo.jpg')}
                style={styles.image}
                resizeMode="contain"
            />
             <Text style={{textAlign:"center",fontWeight:"bold",color:"blue",fontSize:17}}>Welcome in iLakshya Total Solution</Text>
        </View>

        
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        height:200,
        width:"100%",
        alignItems:"center",
    },
    loader: {
        position: 'absolute',
        bottom: 20,
    },
});

export default SplashScreen;