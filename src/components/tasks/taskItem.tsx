import type { Task } from '@/domain/task';
import { Trash2 } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: number) => void;
  onRemove: (taskId: number) => void;
};

const TaskItem = ({ task, onRemove, onToggle }: TaskItemProps) => {
  return (
    <Item variant={'outline'} size={'sm'}>
      <ItemContent>
        <ItemTitle
          className={task.isCompleted ? 'line-through opacity-60' : ''}
        >
          {task.title}
        </ItemTitle>
      </ItemContent>
      <ItemActions className="flex items-center gap-2">
        <Checkbox
          id="terms-checkbox-basic"
          name="terms-checkbox-basic"
          checked={task.isCompleted}
          onCheckedChange={() => onToggle(task.id)}
        />
        <Button
          variant={'ghost'}
          size={'icon'}
          className="flex cursor-pointer items-center justify-center"
          onClick={() => onRemove(task.id)}
        >
          <Trash2 className="text-red-700" size={50} />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default TaskItem;
