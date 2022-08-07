import { Fragment, memo, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

// compponents
import { List } from "@features/ui";
import TodoList from "./todo-list";
import TodoListPlaceholder from "./todo-list.placeholder";
import TodoListFallback from "./todo-list.fallback";
import UserListFallback from "./user-list.fallback";
import UserListPlaceholder from "./user-list.placeholder";

// utils
import { useResource, TResource } from "@/hooks";
import { usersAPI } from "../api";

// types
import { User } from "@typings";
type UserItemProps = { username: User["username"]; id: User["id"] };
type UserListProps = {
  usersResource: TResource<User[]>;
};

const UserItem = memo<UserItemProps>(({ username, id }) => {
  const { resource: todosResource, retry } = useResource(
    usersAPI.getTodosById(id, { limit: 2 })
  );

  return (
    <List.Item className="mb-4">
      <h2 className="text-lg font-semibold">{username}</h2>
      <ErrorBoundary FallbackComponent={TodoListFallback} onReset={retry}>
        <Suspense fallback={<TodoListPlaceholder />}>
          <TodoList todosResource={todosResource} />
        </Suspense>
      </ErrorBoundary>
    </List.Item>
  );
});

function UserListContainer() {
  const { resource: usersResource, retry } = useResource(
    usersAPI.getAll({ limit: 3 })
  );

  return (
    <ErrorBoundary FallbackComponent={UserListFallback} onReset={retry}>
      <Suspense fallback={<UserListPlaceholder />}>
        <UserList usersResource={usersResource} />
      </Suspense>
    </ErrorBoundary>
  );
}

function UserList({ usersResource }: UserListProps) {
  const [users, setUsers] = useState(usersResource.read);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newUsers = await usersAPI.getAll({ page: nextPage, limit: 3 });
    setUsers((prevUsers) => [...prevUsers, ...newUsers]);
    setPage(nextPage);
    setIsLoading(false);
  };

  return (
    <Fragment>
      <List className="mb-4" items={users}>
        {({ id, username }) => (
          <UserItem key={id} id={id} username={username} />
        )}
      </List>

      <button disabled={isLoading} onClick={handleLoadMore}>
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </Fragment>
  );
}

UserItem.displayName = "UserItem";

export default UserListContainer;
