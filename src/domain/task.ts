export type Task = {
  id: number,
  userId: number
  groupId: number | null
  title: string,
  isCompleted: boolean,
  createdAt: Date  
}