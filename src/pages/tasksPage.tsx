import TaskForm from '@/components/tasks/taskForm';
import TaskList from '@/components/tasks/taskList';
import { Progress } from '@/components/ui/progress';
import {
  selectActiveGroup,
  selectTasksByActiveGroup,
  selectTasksProgressByActiveGroup,
} from '@/store/selectors';
import { useTaskStore } from '@/store/useTaskStore';
import { useShallow } from 'zustand/shallow';

const TasksPage = () => {
  const tasks = useTaskStore(useShallow(selectTasksByActiveGroup));

  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const addTask = useTaskStore((state) => state.addTask);
  const activeGroupId = useTaskStore((state) => state.activeGroupId);
  const activeGroup = useTaskStore(selectActiveGroup);
  const updateTask = useTaskStore((state) => state.updateTask);
  const progressValue = useTaskStore(selectTasksProgressByActiveGroup);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);

  const dragEnd = (sourceIndex: number, destinationIndex: number) => {
    reorderTasks(sourceIndex, destinationIndex);
  };

  return (
    <div className="mx-auto h-full w-full max-w-7xl px-2.5">
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-full flex-col gap-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl">{activeGroup?.title ?? 'Все задачи'}</h1>
            <div className="flex w-1/2 flex-col gap-1">
              <div className="flex items-center justify-between">
                <span>Прогресс</span>
                <span>{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-1" />
            </div>
          </div>
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onRemove={removeTask}
            onUpdate={updateTask}
            onDragEnd={dragEnd}
          />
        </div>
        <TaskForm onSubmit={(title) => addTask(title, activeGroupId)} />
      </div>
    </div>
  );
};

export default TasksPage;
