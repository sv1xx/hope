import type { Task } from '@/domain/task';
import TaskItem from './taskItem';

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onRemove: (taskId: number) => void;
};

const TaskList = ({ tasks, onRemove, onToggle }: TaskListProps) => {
  if (tasks.length === 0) return <span>Нет задач</span>;

  return (
    <div className="flex flex-col space-y-2">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default TaskList;
