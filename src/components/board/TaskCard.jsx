import { useBoard } from '../../context/BoardContext';

export function TaskCard({ task, columnId, onDragStart }) {
  const { deleteTask } = useBoard();

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task, columnId)}
      className="task-card"
    >
      <span className="task-title">{task.title}</span>
      <button
        type="button"
        className="btn-delete"
        onClick={() => deleteTask(columnId, task.id)}
      >
        X
      </button>
    </div>
  );
}
