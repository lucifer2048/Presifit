import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onTaskCompleted }) => {
  return (
    <TouchableOpacity onPress={() => onTaskCompleted(task.id)}>
      <View style={styles.taskItem}>
        <Text>{task.name}</Text>
        <Text>{task.description}</Text>
        {/* You can add more details here */}
        {/* For simplicity, a button is used to mark completion */}
        <TouchableOpacity onPress={() => onTaskCompleted(task.id)}>
          <Text>Complete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', description: 'Description for Task 1', completed: false },
    { id: 2, name: 'Task 2', description: 'Description for Task 2', completed: false },
    // Add more tasks here
  ]);

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onTaskCompleted={handleTaskCompletion} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 10,
  },
});

export default TaskList;
