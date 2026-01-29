import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

type TaskFormProps = {
  onSubmit: (title: string) => void;
};

const TaskForm = ({ onSubmit }: TaskFormProps) => {
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
        placeholder="Новая задача"
      />
      <Button
        type="submit"
        variant={'outline'}
        size={'lg'}
        className="cursor-pointer"
      >
        <Plus />
      </Button>
    </form>
  );
};

export default TaskForm;
