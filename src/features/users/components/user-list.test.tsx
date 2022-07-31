import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { usersAPI } from "@features/users/api";
import UserList from "./user-list";
import { User } from "@/typings";

describe("UserList", () => {
  it("should render", async () => {
    const getAllUsers = jest.spyOn(usersAPI, "getAll").mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          username: "username",
        },
      ] as User[])
    );

    render(<UserList />);
    await waitForElementToBeRemoved(() => screen.getByText("loading users..."));
    screen.debug();
    expect(getAllUsers).toHaveBeenCalledWith({ limit: 3 });
  });
});
