import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import UserHeader from "../components/UserHeader";

const TrackerScreen = ({ navigation }) => {
    const [selectedSubject, setSelectedSubject] = useState("");
    const { user } = useAuth();
    const { subjects, getCompletionRate } = useData();

    useEffect(() => {
        if (subjects.length > 0 && !selectedSubject) {
            setSelectedSubject(subjects[0].name);
        }
    }, [user, subjects, selectedSubject]);

    const { completed, total } = selectedSubject
        ? getCompletionRate(selectedSubject)
        : { completed: 0, total: 0 };

    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const incompletePercentage = 100 - completionPercentage;

    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    const completeArcLength = circumference * (completionPercentage / 100);
    const incompleteArcLength = circumference * (incompletePercentage / 100);

    return (
        <View style={styles.Maincontainer}>
            <UserHeader
                username={user?.displayName}
                onTimerPress={() => navigation.navigate("Timer")}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Study Goals Tracker</Text>

                {subjects.length === 0 ? (
                    <Text style={styles.noSubjects}>
                        You have no subjects.{" "}
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate("Subjects")}
                        >
                            <Text style={styles.addButtonText}>Add a subject</Text>
                        </TouchableOpacity>
                    </Text>
                ) : (
                    <>
                        <Text style={styles.label}>Select Subject</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedSubject}
                                onValueChange={(itemValue) => setSelectedSubject(itemValue)}
                                style={styles.picker}
                            >
                                {subjects.map((subject) => (
                                    <Picker.Item key={subject.id} label={subject.name} value={subject.name} />
                                ))}
                            </Picker>
                        </View>

                        <View>
                            <Text style={styles.noSubjects}>
                                Want to add new subjects? {" "}
                            </Text>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation.navigate("Subjects")}
                            >
                                <Text style={styles.addButtonText}>Add a subject</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.subtitle}>Subject: {selectedSubject}</Text>

                        <View style={styles.legend}>
                            <View style={styles.legendItem}>
                                <View style={[styles.colorBox, { backgroundColor: "#4096FF" }]} />
                                <Text>Completed Goals</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.colorBox, { backgroundColor: "#FF5252" }]} />
                                <Text>Incomplete Goals</Text>
                            </View>
                        </View>

                        <View style={styles.chartWrapper}>
                            {total === 0 ? (
                                <View style={{ alignItems: "center" }}>
                                    <Text style={styles.noGoals}>No goals for this subject </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("MainApp")} style={styles.button}>
                                        <Text style={styles.buttonText}>Add your first goal</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Svg height="200" width="200" viewBox="0 0 200 200">
                                    <Circle
                                        cx="100"
                                        cy="100"
                                        r={radius}
                                        stroke="#4096FF"
                                        strokeWidth="30"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference - completeArcLength}
                                        fill="none"
                                        transform="rotate(-90 100 100)"
                                    />
                                    {incompletePercentage > 0 && (
                                        <Circle
                                            cx="100"
                                            cy="100"
                                            r={radius}
                                            stroke="#FF5252"
                                            strokeWidth="30"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={circumference - incompleteArcLength}
                                            fill="none"
                                            transform={`rotate(${completionPercentage * 3.6 - 90} 100 100)`}
                                        />
                                    )}
                                    <SvgText
                                        x="100"
                                        y="100"
                                        fontSize="24"
                                        fontWeight="bold"
                                        fill="#333"
                                        textAnchor="middle"
                                        alignmentBaseline="middle"
                                    >
                                        {completionPercentage}%
                                    </SvgText>
                                </Svg>
                            )}
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Maincontainer: {
        flex: 1,
        paddingBottom: 60,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 60,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    noSubjects: {
        color: "#666",
        fontSize: 16,
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "500",
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginBottom: 20,
    },
    picker: {
        height: Platform.OS === "ios" ? 150 : 50,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    legend: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    colorBox: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    chartWrapper: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    noGoals: {
        width: '100%',
        color: "#666",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#4096FF",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    addButton: {
        backgroundColor: '#4a90e2',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        width: 'auto',
        height: 40,
        alignSelf: 'flex-start',
        marginVertical: 4
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TrackerScreen;
