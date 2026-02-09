import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import GroupTemplate from './groups/groupTamplate';
import { ModeToggle } from './modeToggle';
import { Button } from './ui/button';
import { useTaskStore } from '@/store/useTaskStore';
import { RotateCcw } from 'lucide-react';

export function AppSidebar() {
  const setActiveGroup = useTaskStore((state) => state.setActiveGroup);
  const clearAll = useTaskStore((state) => state.clearAll);
  return (
    <Sidebar variant="floating" className="relative">
      <SidebarHeader className="p-4">
        <ModeToggle />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <GroupTemplate />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <Button
            className="cursor-pointer"
            onClick={() => setActiveGroup(null)}
            variant="secondary"
          >
            Показать все задачи
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer" variant="default">
                <RotateCcw />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Очистить всю информацию?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие не отменить. Вы удалите данные заметок навсегда.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Отменить
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearAll}
                  className="cursor-pointer"
                  variant="destructive"
                >
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
