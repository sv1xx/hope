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
import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import useClickOutside from '@/hooks/useClickOutside';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: number) => void;
  onRemove: (taskId: number) => void;
  onUpdate: (taskId: number, title: string) => void;
};

const TaskItem = ({ task, onRemove, onToggle, onUpdate }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  const containerRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useClickOutside(
    containerRef,
    () => {
      (handleSave(), setIsEditing(false));
    },
    {
      enabled: isEditing,
    },
  );

  const handleSave = () => {
    if (!draftTitle.trim()) return;
    onUpdate(task.id, draftTitle);
    setIsEditing(false);
  };
  return (
    <Item
      variant="outline"
      size="sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <ItemContent ref={containerRef}>
        {isEditing ? (
          <ItemTitle>
            <Input
              autoFocus
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') {
                  setDraftTitle(task.title);
                  setIsEditing(false);
                }
              }}
            />
          </ItemTitle>
        ) : (
          <ItemTitle
            onDoubleClick={() => setIsEditing(true)}
            className={task.isCompleted ? 'line-through opacity-60' : ''}
          >
            {task.title}
          </ItemTitle>
        )}
      </ItemContent>
      <ItemActions className="flex items-center gap-2">
        <Checkbox
          id="terms-checkbox-basic"
          name="terms-checkbox-basic"
          checked={task.isCompleted}
          onCheckedChange={() => onToggle(task.id)}
        />
        <Button
          variant="ghost"
          size="icon"
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
