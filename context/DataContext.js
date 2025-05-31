import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const userId = user.id;

        try {
          const savedGoals = await AsyncStorage.getItem(
            `scholarMind_goals_${userId}`
          );
          const savedSubjects = await AsyncStorage.getItem(
            `scholarMind_subjects_${userId}`
          );
          const savedSessions = await AsyncStorage.getItem(
            `scholarMind_sessions_${userId}`
          );

          if (savedGoals) setGoals(JSON.parse(savedGoals));
          if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
          if (savedSessions) setSessions(JSON.parse(savedSessions));
        } catch (err) {
          console.error("Failed to load data", err);
        }
      } else {
        setGoals([]);
        setSubjects([]);
        setSessions([]);
      }
    };

    loadData();
  }, [user]);

  useEffect(() => {
    const saveData = async () => {
      if (user) {
        const userId = user.id;

        try {
          await AsyncStorage.setItem(
            `scholarMind_goals_${userId}`,
            JSON.stringify(goals)
          );
          await AsyncStorage.setItem(
            `scholarMind_subjects_${userId}`,
            JSON.stringify(subjects)
          );
          await AsyncStorage.setItem(
            `scholarMind_sessions_${userId}`,
            JSON.stringify(sessions)
          );
        } catch (err) {
          console.error("Failed to save data", err);
        }
      }
    };

    saveData();
  }, [goals, subjects, sessions, user]);

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      date: new Date(goal.date).toISOString().split("T")[0],
      completed: false,
    };
    setGoals((prev) => [...prev, newGoal]);
  };
  

  const updateGoal = (id, updatedGoal) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, ...updatedGoal } : goal))
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const toggleGoalCompletion = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const addSubject = (name) => {
    const exists = subjects.some(
      (subject) => subject.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) throw new Error("Subject already exists");

    const newSubject = {
      id: Date.now().toString(),
      name,
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const deleteSubject = (id) => {
    const subjectToDelete = subjects.find((s) => s.id === id);
    if (!subjectToDelete) return;

    const goalsUsingSubject = goals.some(
      (goal) => goal.subject === subjectToDelete.name
    );
    if (goalsUsingSubject)
      throw new Error("Cannot delete a subject that has goals assigned to it");

    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const addSession = (session) => {
    const newSession = {
      ...session,
      id: Date.now().toString(),
    };
    setSessions((prev) => [...prev, newSession]);
  };

  const getGoalsByDate = (date) => {
    return goals.filter((goal) => goal.date === date);
  };

  const getGoalsBySubject = (subject) => {
    return goals.filter((goal) => goal.subject === subject);
  };

  const getCompletionRate = (subject) => {
    const filteredGoals = subject
      ? goals.filter((goal) => goal.subject === subject)
      : goals;

    const total = filteredGoals.length;
    const completed = filteredGoals.filter((goal) => goal.completed).length;

    return { completed, total };
  };

  return (
    <DataContext.Provider
      value={{
        goals,
        subjects,
        sessions,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleGoalCompletion,
        addSubject,
        deleteSubject,
        addSession,
        getGoalsByDate,
        getGoalsBySubject,
        getCompletionRate,
        setSubjects,
        setGoals,
        setSessions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
