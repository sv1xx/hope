import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

type GroupFormProps = {
  onSubmit: (title: string) => void;
};

const GroupForm = ({ onSubmit }: GroupFormProps) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim());
    setTitle('');
  };
  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <Input
        className="h-10"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Новая группа"
      />
      <Button
        type="submit"
        variant="outline"
        size="lg"
        className="cursor-pointer"
      >
        <Plus />
      </Button>
    </form>
  );
};

export default GroupForm;
