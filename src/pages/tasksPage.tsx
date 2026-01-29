import TaskForm from '@/components/tasks/taskForm';
import TaskList from '@/components/tasks/taskList';
import { selectTasksWithoutGroup } from '@/store/selectors';
import { useTaskStore } from '@/store/useTaskStore';
import { useShallow } from 'zustand/shallow';

const TasksPage = () => {
  const tasks = useTaskStore(useShallow(selectTasksWithoutGroup));

  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const addTask = useTaskStore((state) => state.addTask);
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-2.5">
        <div className="flex flex-col gap-4">
          <h1>без группы</h1>
          <TaskForm onSubmit={(title) => addTask(title, null)} />
          <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />
        </div>
      </div>
    </section>
  );
};

export default TasksPage;
