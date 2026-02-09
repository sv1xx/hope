import type { Task } from '@/domain/task';
import TaskItem from './taskItem';
import { ScrollArea } from '../ui/scroll-area';

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onRemove: (taskId: number) => void;
  onUpdate: (taskId: number, title: string) => void;
};

const TaskList = ({ tasks, onRemove, onToggle, onUpdate }: TaskListProps) => {
  if (tasks.length === 0) return <span>Нет задач</span>;

  return (
    <ScrollArea className="h-195 w-full">
      <div className="flex flex-col space-y-2">
        {tasks.map((t) => (
          <TaskItem
            onUpdate={onUpdate}
            key={t.id}
            task={t}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TaskList;
