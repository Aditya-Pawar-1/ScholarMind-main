
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const TimerScreen = ({ navigation }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    // Clean up interval on unmount
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          setMinutes(prevMinutes => {
            if (prevMinutes === 0) {
              clearInterval(interval);
              setIsRunning(false);
              return 0;
            }
            return prevMinutes - 1;
          });
          return 59;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    setTimerInterval(interval);
  };

  const pauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userName}>Aditya Pawar</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Start Session</Text>
        
        <View style={styles.timerContainer}>
          <View style={styles.timerDisplay}>
            <Text style={styles.timerText}>{formatTime(minutes)}</Text>
            <Text style={styles.timerSeparator}>:</Text>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.startButton}
            onPress={isRunning ? pauseTimer : startTimer}
          >
            <Ionicons 
              name={isRunning ? "pause" : "play"} 
              size={24} 
              color="#fff" 
              style={styles.buttonIcon}
            />
            <Text style={styles.startButtonText}>
              {isRunning ? 'pause session' : 'start a session'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  timerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  timerDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  timerSeparator: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginHorizontal: 10,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default TimerScreen;
