import { usersAPI } from "@/features/users/api";
import { generateUsers, generateTodos } from "./factories";

export function mockUsers({ countUsers = 5 } = {}) {
  const users = generateUsers(countUsers);
  jest.spyOn(usersAPI, "getAll").mockReturnValue(Promise.resolve(users));
  return users;
}

export function mockTodos({ countTodos = 5 } = {}) {
  const todos = generateTodos(countTodos);
  jest.spyOn(usersAPI, "getTodosById").mockReturnValue(Promise.resolve(todos));
  return todos;
}
