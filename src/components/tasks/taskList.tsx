import type { Task } from '@/domain/task';
import TaskItem from './taskItem';
import { ScrollArea } from '../ui/scroll-area';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onRemove: (taskId: number) => void;
  onUpdate: (taskId: number, title: string) => void;
  onDragEnd: (sourceIndex: number, destinationIndex: number) => void;
};

const TaskList = ({
  tasks,
  onRemove,
  onToggle,
  onUpdate,
  onDragEnd,
}: TaskListProps) => {
  if (tasks.length === 0) return <span>Нет задач</span>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    onDragEnd(oldIndex, newIndex);
  };

  return (
    <ScrollArea className="h-195 w-full">
      <div className="flex flex-col space-y-2">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks.map((t) => t.id)}>
            {tasks.map((t) => (
              <TaskItem
                onUpdate={onUpdate}
                key={t.id}
                task={t}
                onToggle={onToggle}
                onRemove={onRemove}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </ScrollArea>
  );
};

export default TaskList;
