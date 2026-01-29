import Header from './components/header';
import TasksPage from './pages/tasksPage';
import { ThemeProvider } from './providers/themeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <TasksPage />
    </ThemeProvider>
  );
}

export default App;
