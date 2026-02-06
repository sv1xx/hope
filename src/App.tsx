import SidebarLayout from './layouts/sidebarLayout';
import TasksPage from './pages/tasksPage';
import { ThemeProvider } from './providers/themeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarLayout>
        <TasksPage />
      </SidebarLayout>
    </ThemeProvider>
  );
}

export default App;
