export type Task = {
  id: number;
  groupId: number | null;
  title: string;
  isCompleted: boolean;
  createdAt: number;
};
