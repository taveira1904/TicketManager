import { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import { Column } from './Column';

export function Board() {
  const { columns, addTask, moveTask } = useBoard();
  const [title, setTitle] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title);
    setTitle('');
  };

  const handleDragStart = (task, fromColumnId) => {
    setDraggedTask({ task, fromColumnId });
  };

  const handleDrop = (toColumnId) => {
    if (!draggedTask) return;
    moveTask(draggedTask.task, draggedTask.fromColumnId, toColumnId);
    setDraggedTask(null);
  };

  return (
    <>
      <h1 className="app-title">Dashboard de Tarefas</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nova tarefa (vai para 'Por fazer')..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
        />
        <button type="submit" className="btn-add">
          Adicionar
        </button>
      </form>

      <div className="board">
        {Object.values(columns).map((column) => (
          <Column
            key={column.id}
            column={column}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </>
  );
}
