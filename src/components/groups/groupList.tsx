import type { Group } from '@/domain/group';
import GroupItem from './groupItem';
import { useTaskStore } from '@/store/useTaskStore';

type GroupListProps = {
  groups: Group[];
  onRemove: (taskId: number) => void;
};

const GroupList = ({ onRemove, groups }: GroupListProps) => {
  const setActiveGroup = useTaskStore((state) => state.setActiveGroup);

  if (groups.length === 0) return <span>Нет групп</span>;

  return (
    <div className="flex flex-col space-y-2">
      {groups.map((g) => (
        <GroupItem
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
