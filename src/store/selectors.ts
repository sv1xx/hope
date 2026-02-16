import type { Task } from '@/domain/task';
import type { TaskState } from './useTaskStore';
import type { Group } from '@/domain/group';

export const selectTasksByGroup =
  (groupId: number | null) =>
  (state: TaskState): Task[] =>
    state.tasks.filter((task) => task.groupId === groupId);

export const selectTaskCountByGroup =
  (groupId: number | null) =>
  (state: TaskState): number =>
    state.tasks.filter((task) => task.groupId === groupId).length;

export const selectTasksProgressByActiveGroup = (state: TaskState): number => {
  const tasks =
    state.activeGroupId === null
      ? state.tasks
      : state.tasks.filter((task) => task.groupId === state.activeGroupId);

  const total = tasks.length;
  if (total === 0) return 0;

  const completed = tasks.filter((task) => task.isCompleted).length;

  return Math.round((completed / total) * 100);
};

export const selectGroups = (state: TaskState): Group[] => state.groups;

export const selectTasksWithoutGroup = (state: TaskState): Task[] =>
  state.tasks.filter((task) => task.groupId === null);

// export const selectTasksByActiveGroup = (state: TaskState): Task[] => {
//   if (state.activeGroupId === null) {
//     return state.tasks;
//   }

//   return state.tasks.filter((task) => task.groupId === state.activeGroupId);
// };

export const selectTasksByActiveGroup = (state: TaskState) => {
  if (state.activeGroupId === null) {
    return [...state.tasks].sort((a, b) => a.globalOrder - b.globalOrder);
  }

  return state.tasks
    .filter((t) => t.groupId === state.activeGroupId)
    .sort((a, b) => a.groupOrder - b.groupOrder);
};

export const selectActiveGroup = (state: TaskState) =>
  state.groups.find((g) => g.id === state.activeGroupId) ?? null;
