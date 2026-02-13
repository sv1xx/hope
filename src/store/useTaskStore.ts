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
  updateGroup: (groudId: number, title: string) => void;

  addTask: (title: string, groupId: number | null) => void;
  removeTask: (taskId: number) => void;
  toggleTask: (taskId: number) => void;
  updateTask: (taskId: number, title: string) => void;
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
      updateGroup: (groupId, title) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId ? { ...group, title } : group,
          ),
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
              order: 0,
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

      updateTask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, title } : task,
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
