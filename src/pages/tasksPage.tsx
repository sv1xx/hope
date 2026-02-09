import TaskForm from '@/components/tasks/taskForm';
import TaskList from '@/components/tasks/taskList';
import { selectActiveGroup, selectTasksByActiveGroup } from '@/store/selectors';
import { useTaskStore } from '@/store/useTaskStore';
import { useShallow } from 'zustand/shallow';

const TasksPage = () => {
  const tasks = useTaskStore(useShallow(selectTasksByActiveGroup));

  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const addTask = useTaskStore((state) => state.addTask);
  const activeGroupId = useTaskStore((state) => state.activeGroupId);
  const activeGroup = useTaskStore(selectActiveGroup);

  return (
    <div className="mx-auto h-full w-full max-w-7xl px-2.5">
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-full flex-col gap-10">
          <h1 className="text-3xl">{activeGroup?.title ?? 'Все задачи'}</h1>
          <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />
        </div>
        <TaskForm onSubmit={(title) => addTask(title, activeGroupId)} />
      </div>
    </div>
  );
};

export default TasksPage;
