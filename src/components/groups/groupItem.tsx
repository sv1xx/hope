import { Trash2 } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '../ui/button';
import type { Group } from '@/domain/group';
import { useState } from 'react';
import { Input } from '../ui/input';

type GroupItemProps = {
  group: Group;
  onRemove: (groupId: number) => void;
  onSelect: (groupId: number) => void;
  onUpdate: (groupId: number, title: string) => void;
};

const GroupItem = ({ group, onRemove, onSelect, onUpdate }: GroupItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(group.title);

  const handleSave = () => {
    if (!draftTitle.trim()) return;
    onUpdate(group.id, draftTitle);
    setIsEditing(false);
  };
  return (
    <Item
      onClick={() => onSelect(group.id)}
      variant="outline"
      className="cursor-pointer py-1 pr-2 pl-4 hover:bg-neutral-800"
    >
      <ItemContent>
        {isEditing ? (
          <ItemTitle>
            <Input
              autoFocus
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') {
                  setDraftTitle(group.title);
                  setIsEditing(false);
                }
              }}
            />
          </ItemTitle>
        ) : (
          <ItemTitle onDoubleClick={() => setIsEditing(true)}>
            {group.title}
          </ItemTitle>
        )}
      </ItemContent>
      <ItemActions className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex cursor-pointer items-center justify-center"
          onClick={(e) => {
            (e.stopPropagation(), onRemove(group.id));
          }}
        >
          <Trash2 className="text-red-700" size={50} />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default GroupItem;
