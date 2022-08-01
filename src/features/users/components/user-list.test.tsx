import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import UserList from "./user-list";
import { mockTodos, mockUsers } from "@/utils/testUtils";

describe("UserList", () => {
  beforeEach(() => {
    mockTodos();
    mockUsers();
  });

  it("should render all users with their todos", async () => {
    const users = mockUsers({ countUsers: 2 });
    const todos = mockTodos();

    render(<UserList />);
    await waitForElementToBeRemoved(() => screen.getByText("loading users..."));
    await waitForElementToBeRemoved(() =>
      screen.getAllByText("loading todos...")
    );

    users.forEach((user) => screen.getByText(user.username));
    todos.forEach((todo) => screen.getAllByText(todo.title, { exact: false }));
  });
});
