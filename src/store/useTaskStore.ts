import type { Group } from '@/domain/group';
import type { Task } from '@/domain/task';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskState = {
  groups: Group[];
  tasks: Task[];

  activeGroupId: number | null;
  setActiveGroup: (groupId: number | null) => void;
  clearAll: () => void;

  addGroup: (title: string) => void;
  removeGroup: (groupId: number) => void;

  addTask: (title: string, groupId: number | null) => void;
  removeTask: (taskId: number) => void;
  toggleTask: (taskId: number) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      groups: [],
      activeGroupId: null,

      setActiveGroup: (groupId) =>
        set(() => ({
          activeGroupId: groupId,
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
          activeGroupId:
            state.activeGroupId === groupId ? null : state.activeGroupId,
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

      clearAll: () =>
        set(() => ({
          tasks: [],
          groups: [],
          activeGroupId: null,
        })),
    }),
    { name: 'tasks-storage' },
  ),
);
