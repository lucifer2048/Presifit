import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const TaskItem = ({ task, onTaskCompleted }) => {
  return (
    <TouchableOpacity onPress={() => onTaskCompleted(task.id)}>
      <View style={[styles.taskItem, task.completed && styles.completedTask]}>
        <Text style={[styles.Textstyle, task.completed && styles.completedText]}>{task.description}</Text>
        {/* For simplicity, a button is used to mark completion */}
        {!task.completed && (
          <TouchableOpacity onPress={() => onTaskCompleted(task.id)}>
            <Text>Not Completed yet</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', description: 'Burn 500 calories today', completed: false },
    { id: 2, name: 'Task 2', description: 'No junk foods for a week', completed: false },
    { id: 3, name: 'Task 3', description: 'Complete 15000 steps this month', completed: false },
    // Add more tasks here
  ]);

  const [inputTask, setInputTask] = useState('');

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (inputTask.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: `Task ${tasks.length + 1}`,
        description: inputTask.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputTask('');
    }
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={inputTask}
          onChangeText={(text) => setInputTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add Goals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 52,
  },
  taskItem: {
    flexDirection: 'col',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    justifyContent:"center",
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#cccccc',
    margin: 10,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#48cae4',
    elevation:10
  },
  completedTask: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  Textstyle: {
    fontSize: 24,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#3d405b',
    borderRadius: 24,
    marginRight:5
  },
  addButton: {
    backgroundColor: '#3d405b',
    padding: 12,
    borderRadius: 24,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TaskList;
