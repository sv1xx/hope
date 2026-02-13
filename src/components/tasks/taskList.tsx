import type { Task } from '@/domain/task';
import TaskItem from './taskItem';
import { ScrollArea } from '../ui/scroll-area';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useState } from 'react';

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onRemove: (taskId: number) => void;
  onUpdate: (taskId: number, title: string) => void;
};

const TaskList = ({ tasks, onRemove, onToggle, onUpdate }: TaskListProps) => {
  const [data, setData] = useState<Task[]>(tasks);
  if (tasks.length === 0) return <span>Нет задач</span>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setData((task) => {
        const oldIndex = task.findIndex((item) => item.order === active.id);
        const newIndex = task.findIndex((item) => item.order === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  return (
    <ScrollArea className="h-195 w-full">
      <div className="flex flex-col space-y-2">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={data}>
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
