import type { Group } from '@/domain/group';
import type { Task } from '@/domain/task';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskState = {
  groups: Group[];
  tasks: Task[];

  activeGroup: ActiveGroup;
  setActiveGroup: (group: ActiveGroup) => void;

  addGroup: (title: string) => void;
  removeGroup: (groupId: number) => void;

  addTask: (title: string, groupId: number | null) => void;
  removeTask: (taskId: number) => void;
  toggleTask: (taskId: number) => void;
};

export type ActiveGroup = {
  id: number | null;
  title: string | null;
} | null;

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      groups: [],
      activeGroup: null,

      setActiveGroup: (group) =>
        set(() => ({
          activeGroup: group,
        })),

      addGroup: (title) =>
        set((state) => ({
          groups: [
            ...state.groups,
            { id: Date.now(), title, createdAt: Date.now() },
          ],
        })),
      removeGroup: (groupId) =>
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== groupId),
          tasks: state.tasks.filter((task) => task.groupId !== groupId),
        })),

      addTask: (title, groupId) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now(),
              title,
              groupId,
              isCompleted: false,
              createdAt: Date.now(),
            },
          ],
        })),

      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, isCompleted: !task.isCompleted }
              : task,
          ),
        })),
    }),
    { name: 'tasks-storage' },
  ),
);
