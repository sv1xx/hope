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

export const selectTaskProgressByGroup =
  (groupId: number | null) =>
  (state: TaskState): number => {
    const totalTasks = state.tasks.filter((task) => task.groupId === groupId);

    if (totalTasks.length === 0) return 0;

    const completedTasks = state.tasks.filter(
      (task) => task.isCompleted === true,
    ).length;

    return completedTasks / totalTasks.length;
  };

export const selectGroups = (state: TaskState): Group[] => state.groups;

export const selectTasksWithoutGroup = (state: TaskState): Task[] =>
  state.tasks.filter((task) => task.groupId === null);

export const selectTasksByActiveGroup = (state: TaskState): Task[] => {
  if (state.activeGroup === null) {
    return state.tasks;
  }

  return state.tasks.filter((task) => task.groupId === state.activeGroup?.id);
};
