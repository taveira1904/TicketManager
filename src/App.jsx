import { BoardProvider } from './context/BoardContext';
import { Board } from './components/board/Board';

function App() {
  return (
    <div className="app-root">
      <main className="container">
        <BoardProvider>
          <Board />
        </BoardProvider>
      </main>
    </div>
  );
}

export default App;
