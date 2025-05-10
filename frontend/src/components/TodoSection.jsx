import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2, Plus, ListTodo } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
const TodoSection = () => {
    const [tasks, setTasks] = useState([
        { id: '1', text: 'Complete Database Assignment', completed: false, dueDate: new Date(2025, 4, 10) },
        { id: '2', text: 'Study for Physics quiz', completed: true, dueDate: new Date(2025, 4, 9) },
        { id: '3', text: 'Review calculus notes', completed: false, dueDate: null },
    ]);
    const [newTask, setNewTask] = useState('');
    const [selectedDueDate, setSelectedDueDate] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [editText, setEditText] = useState('');
    const [filter, setFilter] = useState('all');
    const addTask = () => {
        if (newTask.trim() === '') {
            toast('Task cannot be empty', {
                description: 'Please enter a task description'
            });
            return;
        }
        const newTaskItem = {
            id: Date.now().toString(),
            text: newTask,
            completed: false,
            dueDate: selectedDueDate
        };
        setTasks([...tasks, newTaskItem]);
        setNewTask('');
        setSelectedDueDate(null);
        toast('Task added!', {
            description: 'Your new task has been added successfully'
        });
    };
    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                const updatedTask = { ...task, completed: !task.completed };
                toast(updatedTask.completed ? 'Task completed!' : 'Task marked as pending', {
                    description: updatedTask.text
                });
                return updatedTask;
            }
            return task;
        }));
    };
    const deleteTask = (id) => {
        const taskToDelete = tasks.find(task => task.id === id);
        setTasks(tasks.filter(task => task.id !== id));
        toast('Task deleted', {
            description: taskToDelete?.text
        });
    };
    const startEditing = (task) => {
        setEditingTask(task.id);
        setEditText(task.text);
    };
    const saveEdit = (id) => {
        if (editText.trim() === '') {
            toast('Task cannot be empty', {
                description: 'Please enter a task description'
            });
            return;
        }
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: editText };
            }
            return task;
        }));
        setEditingTask(null);
        toast('Task updated', {
            description: 'Your task has been updated successfully'
        });
    };
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed')
            return task.completed;
        if (filter === 'pending')
            return !task.completed;
        return true;
    });
    return (<div className="container mx-auto px-4 py-8 max-w-3xl"> {/* Adjusted py-20 to py-8 as App.jsx handles navbar offset */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-outfit text-gray-800 flex items-center justify-center gap-2">
          <ListTodo size={32} className="text-buddy-lavender"/>
          Student To-Do List
        </h1>
        <p className="text-gray-600 mt-2">Keep track of your assignments and study tasks! 📚</p>
      </div>
      
      <Card className="p-6 shadow-lg mb-6 bg-white/80 backdrop-blur-sm"> {/* Changed card background */}
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex-1">
            <Input placeholder="Add a new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} className="w-full" onKeyDown={(e) => {
            if (e.key === 'Enter')
                addTask();
        }}/>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("border border-buddy-lavender", selectedDueDate && "text-buddy-lavender")}>
                  {selectedDueDate ? format(selectedDueDate, "MMM d, yyyy") : "Due Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selectedDueDate || undefined} onSelect={setSelectedDueDate} initialFocus className="pointer-events-auto"/>
              </PopoverContent>
            </Popover>
            
            <Button onClick={addTask} className="bg-buddy-lavender hover:bg-opacity-90 text-white flex items-center gap-1">
              <Plus size={18}/>
              Add
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="mb-6">
        <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value)} className="justify-center">
          <ToggleGroupItem value="all" aria-label="All tasks" className="data-[state=on]:bg-buddy-lavender data-[state=on]:text-white">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="completed" aria-label="Completed tasks" className="data-[state=on]:bg-buddy-lavender data-[state=on]:text-white">
            Completed
          </ToggleGroupItem>
          <ToggleGroupItem value="pending" aria-label="Pending tasks" className="data-[state=on]:bg-buddy-lavender data-[state=on]:text-white">
            Pending
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (filteredTasks.map(task => (<Card key={task.id} className={cn("p-4 transition-all hover:shadow-md", task.completed ? "bg-green-500/10 border-l-4 border-l-green-400" : "bg-white/80 backdrop-blur-sm border-l-4 border-l-buddy-lavender")}> {/* Changed card backgrounds */}
              <div className="flex items-start gap-3">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} className="mt-1"/>
                
                <div className="flex-1">
                  {editingTask === task.id ? (<div className="flex gap-2">
                      <Input value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1"/>
                      <Button size="sm" onClick={() => saveEdit(task.id)}>Save</Button>
                    </div>) : (<>
                      <p className={cn("text-lg", task.completed && "line-through text-gray-500")}>{task.text}</p>
                      {task.dueDate && (<p className="text-sm text-gray-600 mt-1">
                          Due: {format(task.dueDate, "MMM d, yyyy")}
                        </p>)}
                    </>)}
                </div>
                
                {editingTask !== task.id && (<div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => startEditing(task)} className="text-gray-500 hover:text-buddy-lavender">
                      <Edit size={18}/>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteTask(task.id)} className="text-gray-500 hover:text-red-500">
                      <Trash2 size={18}/>
                    </Button>
                  </div>)}
              </div>
            </Card>))) : (<Card className="p-8 text-center bg-white/80 backdrop-blur-sm"> {/* Changed card background */}
            <p className="text-gray-500">No tasks found. Add some tasks to get started!</p>
          </Card>)}
      </div>
      
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button onClick={() => {
            const taskInput = document.querySelector('input');
            if (taskInput)
                taskInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }} className="h-14 w-14 rounded-full bg-buddy-lavender hover:bg-opacity-90 text-white shadow-lg">
          <Plus size={24}/>
        </Button>
      </div>
    </div>);
};
export default TodoSection;
