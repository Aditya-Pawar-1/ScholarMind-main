
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from 'react-native-vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

const PasscodeScreen = ({ navigation }) => {
  const [passcode, setPasscode] = useState('');
  const [storedPasscode, setStoredPasscode] = useState('');

  useEffect(() => {
    const getPasscode = async () => {
      try {
        const storedCode = await AsyncStorage.getItem('passcode');
        if (storedCode) {
          setStoredPasscode(storedCode);
        }
      } catch (error) {
        console.error('Error getting passcode:', error);
      }
    };

    getPasscode();
  }, []);

  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!compatible || !enrolled) {
      Alert.alert('Error', 'Biometric authentication not available or not set up on this device.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with fingerprint',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      navigation.navigate('MainApp');
    } else {
      Alert.alert('Authentication Failed', 'Could not authenticate using biometrics.');
    }
  };

  const handleNumberPress = (number) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + number;
      setPasscode(newPasscode);

      // Check if complete passcode entered
      if (newPasscode.length === 4) {
        verifyPasscode(newPasscode);
      }
    }
  };

  const handleDeletePress = () => {
    setPasscode(passcode.slice(0, -1));
  };

  const verifyPasscode = (code) => {
    if (code === storedPasscode) {
      navigation.replace('MainApp');
    } else {
      Alert.alert('Error', 'Incorrect passcode. Please try again.');
      setPasscode('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>ScholarMind</Text>
      </View>

      <View style={styles.passcodeContainer}>
        <Text style={styles.passcodeTitle}>Passcode</Text>

        <View style={styles.dotsContainer}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index < passcode.length ? styles.dotFilled : null,
              ]}
            />
          ))}
        </View>

        <View style={styles.keypadContainer}>
          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('1')}
            >
              <Text style={styles.keypadButtonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('2')}
            >
              <Text style={styles.keypadButtonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('3')}
            >
              <Text style={styles.keypadButtonText}>3</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('4')}
            >
              <Text style={styles.keypadButtonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('5')}
            >
              <Text style={styles.keypadButtonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('6')}
            >
              <Text style={styles.keypadButtonText}>6</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('7')}
            >
              <Text style={styles.keypadButtonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('8')}
            >
              <Text style={styles.keypadButtonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('9')}
            >
              <Text style={styles.keypadButtonText}>9</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={handleBiometricAuth}
            >
              <Ionicons name="finger-print-outline" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleNumberPress('0')}
            >
              <Text style={styles.keypadButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={handleDeletePress}
            >
              <Ionicons name="backspace-outline" size={30} color="#4a90e2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4a90e2',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain'
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  passcodeContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  passcodeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  dotFilled: {
    backgroundColor: '#4a90e2',
  },
  keypadContainer: {
    paddingHorizontal: 30,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  keypadButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PasscodeScreen;