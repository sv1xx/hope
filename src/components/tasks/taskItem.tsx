import type { Task } from '@/domain/task';
import { GripVertical, X } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import { Checkbox } from '../ui/checkbox';
import { useRef, useState } from 'react';
import { Input } from '../ui/input';
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.1)' : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

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
      className="group hover:bg-muted/40 transition-colors"
    >
      <ItemActions className="flex items-center gap-4">
        <GripVertical {...listeners} className="cursor-grab" />
        <Checkbox
          id="terms-checkbox-basic"
          className="h-5 w-5"
          name="terms-checkbox-basic"
          checked={task.isCompleted}
          onCheckedChange={() => onToggle(task.id)}
        />
      </ItemActions>
      <ItemContent ref={containerRef}>
        {isEditing ? (
          <ItemTitle>
            <Input
              autoFocus
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={handleSave}
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
            onClick={() => setIsEditing(true)}
            className={task.isCompleted ? 'line-through opacity-60' : ''}
          >
            {task.title}
          </ItemTitle>
        )}
      </ItemContent>
      <ItemActions>
        <button
          className="cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => onRemove(task.id)}
        >
          <X className="" size={24} strokeWidth={1.5} />
        </button>
      </ItemActions>
    </Item>
  );
};

export default TaskItem;
