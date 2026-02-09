import type { Group } from '@/domain/group';
import GroupItem from './groupItem';
import { useTaskStore } from '@/store/useTaskStore';

type GroupListProps = {
  groups: Group[];
  onRemove: (taskId: number) => void;
  onUpdate: (groupId: number, title: string) => void;
};

const GroupList = ({ onRemove, groups, onUpdate }: GroupListProps) => {
  const setActiveGroup = useTaskStore((state) => state.setActiveGroup);

  if (groups.length === 0) return <span>Нет групп</span>;

  return (
    <div className="flex flex-col space-y-2">
      {groups.map((g) => (
        <GroupItem
          onUpdate={onUpdate}
          onSelect={setActiveGroup}
          key={g.id}
          group={g}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default GroupList;
