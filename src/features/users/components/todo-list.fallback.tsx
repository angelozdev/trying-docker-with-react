import { FallbackProps } from "react-error-boundary";

function TodoListFallback({ resetErrorBoundary, error }: FallbackProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4>Something went wrong: {error.message}</h4>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

export default TodoListFallback;
