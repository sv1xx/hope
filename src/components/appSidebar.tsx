import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import GroupTemplate from './groups/groupTamplate';
import { ModeToggle } from './modeToggle';
import { Button } from './ui/button';
import { useTaskStore } from '@/store/useTaskStore';

export function AppSidebar() {
  const setActiveGroup = useTaskStore((state) => state.setActiveGroup);
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
        <Button
          className="cursor-pointer"
          onClick={() => setActiveGroup(null)}
          variant="secondary"
        >
          Показать все задачи
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
