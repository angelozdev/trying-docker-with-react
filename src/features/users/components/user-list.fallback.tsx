import { FallbackProps } from "react-error-boundary";

function UserListFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <h1>Something went wrong to try get users.</h1>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

export default UserListFallback;
