import { TaskCard } from './TaskCard';

export function Column({ column, onDrop, onDragStart }) {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(column.id)}
    >
      <h2
        className="column-title"
        data-count={column.tasks.length}
      >
        {column.title}
      </h2>

      {column.tasks.length === 0 && (
        <p className="column-empty">Arraste tarefas para aqui.</p>
      )}

      <div className="task-list">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
