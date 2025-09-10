import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  description?: string;
  location?: string;
}

const InteractiveTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Water tomato field #2',
      time: '10:00 AM',
      priority: 'high',
      completed: false,
      description: 'Check soil moisture and apply drip irrigation',
      location: 'North Field Section B'
    },
    {
      id: '2',
      title: 'Apply fertilizer to wheat crop',
      time: '2:00 PM',
      priority: 'medium',
      completed: false,
      description: 'Apply NPK fertilizer (2kg per acre)',
      location: 'East Field Section A'
    },
    {
      id: '3',
      title: 'Check pest traps in field #4',
      time: '4:00 PM',
      priority: 'low',
      completed: true,
      description: 'Inspect and reset yellow sticky traps',
      location: 'South Field Section D'
    }
  ]);

  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const editTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const newTitle = prompt('Edit task title:', task?.title);
    if (newTitle && newTitle.trim()) {
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, title: newTitle } : task
        )
      );
    }
  };

  const postponeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      alert(`Task "${task.title}" postponed to tomorrow`);
      // In real app, you would update the date
    }
  };

  const startTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      alert(`Starting task: "${task.title}"\nLocation: ${task.location}\nInstructions: ${task.description}`);
    }
  };

  const toggleExpand = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const getPriorityColor = (priority: string, completed: boolean) => {
    if (completed) return 'bg-gray-100 text-gray-600';
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          <h2 className="text-2xl font-bold text-gray-800">Today's Priority Tasks</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {tasks.filter(t => t.completed).length}/{tasks.length} completed
          </span>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
            ➕ Add Task
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Main Task Row */}
            <div className={`p-4 ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                {/* Left side - Checkbox and Task Info */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* Custom Checkbox */}
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400 bg-white'
                    }`}
                  >
                    {task.completed && <span className="text-sm font-bold">✓</span>}
                  </button>

                  {/* Task Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className={`font-semibold ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}>
                        {task.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority, task.completed)}`}>
                        {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600 flex items-center">
                        🕒 {task.time}
                      </span>
                      {task.location && (
                        <span className="text-sm text-gray-600 flex items-center">
                          📍 {task.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Action Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Quick Action Buttons - Always Visible */}
                  {!task.completed && (
                    <button
                      onClick={() => startTask(task.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                      title="Start Task"
                    >
                      ▶️ Start
                    </button>
                  )}
                  
                  <button
                    onClick={() => editTask(task.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                    title="Edit Task"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => postponeTask(task.id)}
                    className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                    title="Postpone Task"
                  >
                    ⏰ Later
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    title="Delete Task"
                  >
                    🗑️ Delete
                  </button>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="More Details"
                  >
                    {expandedTask === task.id ? '🔽' : '▶️'}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedTask === task.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">📋 Task Details</h4>
                    <p className="text-blue-700 text-sm mb-2">{task.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-blue-800">⏰ Scheduled:</span>
                        <span className="text-blue-700 ml-2">{task.time}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">📍 Location:</span>
                        <span className="text-blue-700 ml-2">{task.location}</span>
                      </div>
                    </div>
                    
                    {/* Additional Action Buttons in Expanded View */}
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Task Summary Cards */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {tasks.filter(t => t.completed).length}
          </div>
          <div className="text-sm text-green-700 font-medium">Completed Today</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">
            {tasks.filter(t => !t.completed).length}
          </div>
          <div className="text-sm text-yellow-700 font-medium">Remaining Tasks</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
          <div className="text-2xl font-bold text-red-600">
            {tasks.filter(t => t.priority === 'high' && !t.completed).length}
          </div>
          <div className="text-sm text-red-700 font-medium">High Priority</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTaskManager;
