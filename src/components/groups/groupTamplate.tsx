import { selectGroups } from '@/store/selectors';
import { useTaskStore } from '@/store/useTaskStore';
import { useShallow } from 'zustand/shallow';
import GroupForm from './groupForm';
import GroupList from './groupList';

const GroupTemplate = () => {
  const groups = useTaskStore(useShallow(selectGroups));
  const removeGroup = useTaskStore((state) => state.removeGroup);
  const addGroup = useTaskStore((state) => state.addGroup);

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-2.5">
        <div className="flex flex-col gap-4">
          <h1>Группы</h1>
          <GroupForm onSubmit={(title) => addGroup(title)} />
          <GroupList groups={groups} onRemove={removeGroup} />
        </div>
      </div>
    </section>
  );
};

export default GroupTemplate;
