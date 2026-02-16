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
  reorderTasks: (sourceIndex: number, destinationIndex: number) => void;
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
        set((state) => {
          const maxGlobalOrder =
            state.tasks.length > 0
              ? Math.max(...state.tasks.map((t) => t.globalOrder))
              : -1;

          const groupTasks = state.tasks.filter(
            (task) => task.groupId === groupId,
          );

          const maxGroupOrder =
            groupTasks.length > 0
              ? Math.max(...groupTasks.map((t) => t.groupOrder))
              : -1;

          return {
            tasks: [
              ...state.tasks,
              {
                id: Date.now(),
                title,
                groupId,
                isCompleted: false,
                createdAt: Date.now(),
                globalOrder: maxGlobalOrder + 1,
                groupOrder: maxGroupOrder + 1,
              },
            ],
          };
        }),

      reorderTasks: (sourceIndex: number, destinationIndex: number) =>
        set((state) => {
          const activeGroupId = state.activeGroupId;

          const sortedTasks =
            activeGroupId === null
              ? [...state.tasks].sort((a, b) => a.globalOrder - b.globalOrder)
              : state.tasks
                  .filter((t) => t.groupId === activeGroupId)
                  .sort((a, b) => a.groupOrder - b.groupOrder);

          const [moved] = sortedTasks.splice(sourceIndex, 1);
          sortedTasks.splice(destinationIndex, 0, moved);

          const updatedTasks = state.tasks.map((task) => {
            const index = sortedTasks.findIndex((t) => t.id === task.id);
            if (index === -1) return task;

            if (activeGroupId === null) {
              return { ...task, globalOrder: index };
            }

            return { ...task, groupOrder: index };
          });

          return { tasks: updatedTasks };
        }),

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
