import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STORAGE_KEY = 'kanban-columns-v1';

const initialColumns = {
  todo: { id: 'todo', title: 'Por fazer', tasks: [] },
  doing: { id: 'doing', title: 'Em progresso', tasks: [] },
  done: { id: 'done', title: 'Concluídas', tasks: [] },
};

const BoardContext = createContext(null);

export function BoardProvider({ children }) {
  const [columns, setColumns] = useLocalStorage(STORAGE_KEY, initialColumns);

  const addTask = (title) => {
    if (!title.trim()) return;
    const newTask = { id: Date.now().toString(), title: title.trim() };

    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        tasks: [newTask, ...prev.todo.tasks],
      },
    }));
  };

  const moveTask = (task, fromColumnId, toColumnId) => {
    if (fromColumnId === toColumnId) return;

    setColumns((prev) => {
      const fromTasks = prev[fromColumnId].tasks.filter(
        (t) => t.id !== task.id,
      );
      const toTasks = [task, ...prev[toColumnId].tasks];

      return {
        ...prev,
        [fromColumnId]: { ...prev[fromColumnId], tasks: fromTasks },
        [toColumnId]: { ...prev[toColumnId], tasks: toTasks },
      };
    });
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter((t) => t.id !== taskId),
      },
    }));
  };

  const value = { columns, addTask, moveTask, deleteTask };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) {
    throw new Error('useBoard deve ser usado dentro de BoardProvider');
  }
  return ctx;
}
