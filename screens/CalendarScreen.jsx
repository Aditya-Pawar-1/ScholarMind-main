import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useData } from '../context/DataContext';
import { Calendar } from 'react-native-calendars';
import Checkbox from 'expo-checkbox';
import UserHeader from "../components/UserHeader";
import { auth } from '../firebase/firebaseconfig';


const CalendarScreen = () => {
    const { toggleGoalCompletion, getGoalsByDate } = useData();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [goals, setGoals] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }

        const dateStr = selectedDate.toISOString().split('T')[0];
        setGoals(getGoalsByDate(dateStr));
    }, [selectedDate, getGoalsByDate]);

    const handleToggleGoal = (goalId) => {
        toggleGoalCompletion(goalId);
        const dateStr = selectedDate.toISOString().split('T')[0];
        setGoals(getGoalsByDate(dateStr));
    };

    const renderGoal = ({ item }) => (
        <View style={styles.goalItem}>
            <View style={styles.goalInfo}>
                <Checkbox
                    value={item.completed}
                    onValueChange={() => handleToggleGoal(item.id)}
                    color={item.completed ? '#4096FF' : undefined}
                />
                <View>
                    <Text style={[styles.goalTitle, item.completed && styles.goalCompleted]}>
                        {item.title}
                    </Text>
                    <Text style={styles.goalSubject}>Subject: {item.subject}</Text>
                </View>
            </View>
        </View>
    );

    const getReadableDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <View style={styles.container}>
            <UserHeader
                username={user?.displayName}
                onTimerPress={() => navigation.navigate("Timer")}
            />
            <Text style={styles.header}>Calendar</Text>

            <Calendar
                onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
                markedDates={{
                    [selectedDate.toISOString().split('T')[0]]: {
                        selected: true,
                        selectedColor: '#4096FF',
                    },
                }}
                theme={{
                    selectedDayBackgroundColor: '#4096FF',
                    selectedDayTextColor: '#fff',
                    todayTextColor: '#4096FF',
                    arrowColor: '#4096FF',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                }}
                style={styles.calendar}
            />

            <Text style={styles.subHeader}>
                Goals for {getReadableDate(selectedDate)}
            </Text>

            {goals.length === 0 ? (
                <Text style={styles.noGoalsText}>No goals for this day</Text>
            ) : (
                <FlatList
                    data={goals}
                    keyExtractor={(item) => item.id}
                    renderItem={renderGoal}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        paddingTop: 8
    },
    calendar: {
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 2,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    noGoalsText: {
        paddingHorizontal: 16,
        color: '#888',
    },
    goalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    goalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    goalTitle: {
        width: '400%',
        fontSize: 16,
        color: '#000',
    },
    goalCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    goalSubject: {
        width: '400%',
        fontSize: 14,
        color: '#666',
    },
});

export default CalendarScreen;