import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import UserList from "./user-list";
import { mockTodos, mockUsers } from "@/utils/testUtils";
import { usersAPI } from "../api";
import { faker } from "@faker-js/faker";

const waitForLoading = async () => {
  await waitForElementToBeRemoved(() => screen.getByText("loading users..."));
  await waitForElementToBeRemoved(() =>
    screen.getAllByText("loading todos...")
  );
};

describe("UserList", () => {
  beforeEach(() => {
    mockTodos();
    mockUsers();
  });

  it("should render all users", async () => {
    const users = mockUsers({ countUsers: 2 });

    render(<UserList />);
    await waitForLoading();
    users.forEach((user) => screen.getByText(user.username));
  });

  it("should render all todos", async () => {
    const todos = mockTodos({ countTodos: 2 });

    render(<UserList />);
    await waitForLoading();
    todos.forEach((todo) => screen.getAllByText(todo.title, { exact: false }));
  });

  it("usersApi.getAll should be called once", async () => {
    const getAllUsers = jest.spyOn(usersAPI, "getAll");
    render(<UserList />);
    await waitForLoading();
    expect(getAllUsers).toHaveBeenCalledTimes(1);
  });

  it("usersApi.getTodosByid should be called once for every user", async () => {
    const NUMBER_OF_USERS = faker.datatype.number({ min: 1, max: 5 });
    mockUsers({ countUsers: NUMBER_OF_USERS });
    const getTodosById = jest.spyOn(usersAPI, "getTodosById");
    render(<UserList />);
    await waitForLoading();
    expect(getTodosById).toHaveBeenCalledTimes(NUMBER_OF_USERS);
  });
});
