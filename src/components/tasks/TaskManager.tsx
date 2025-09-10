import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  category: 'irrigation' | 'fertilizer' | 'pest' | 'general';
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Water tomato field #2',
      time: '10:00 AM',
      priority: 'high',
      completed: false,
      category: 'irrigation'
    },
    {
      id: '2',
      title: 'Apply fertilizer to wheat crop',
      time: '2:00 PM',
      priority: 'medium',
      completed: false,
      category: 'fertilizer'
    },
    {
      id: '3',
      title: 'Check pest traps in field #4',
      time: '4:00 PM',
      priority: 'low',
      completed: true,
      category: 'pest'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState<{
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';  // Fix: Allow all priority types
}>({ 
  title: '', 
  time: '', 
  priority: 'medium' 
});
  // Toggle task completion
  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Add new task
  const addTask = () => {
    if (newTask.title && newTask.time) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        time: newTask.time,
        priority: newTask.priority,
        completed: false,
        category: 'general'
      };
      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', time: '', priority: 'medium' });
      setShowAddForm(false);
    }
  };

  // Edit task (opens modal)
  const editTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      alert(`Editing: ${task.title}\n(Full edit modal would open here)`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-3 text-3xl">🎯</span>
          Today's Priority Tasks
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add Task</span>
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-3">Add New Task</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask(prev => ({ ...prev, time: e.target.value }))}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={addTask}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Task
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            {/* Checkbox */}
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                task.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && <span className="text-sm">✓</span>}
            </button>

            {/* Task Content */}
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{task.time}</p>
            </div>

            {/* Priority Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => editTask(task.id)}
                className="text-blue-500 hover:text-blue-700 p-1"
                title="Edit task"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Summary */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">📊 Task Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => !t.completed).length}</div>
            <div className="text-sm text-yellow-700">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{tasks.filter(t => t.priority === 'high' && !t.completed).length}</div>
            <div className="text-sm text-red-700">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
