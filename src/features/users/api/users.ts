import { Todo, TParams, User } from "@typings";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

function objectToSearchParams(object: Record<string, string>) {
  const searchParams = new URLSearchParams(object);
  return searchParams.toString();
}

function transformValuesToString(object: Record<string, string | number>) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);
}

function serializeParams<T>(params: TParams<T>) {
  const {
    limit = 15,
    offset = 0,
    orderBy = "asc",
    page = 1,
    sortBy = "id" as const,
  } = params;

  const paramsObject = {
    _limit: limit,
    _start: offset,
    _sort: sortBy,
    _order: orderBy,
    _page: page,
  };

  return paramsObject;
}

export async function getAll(params: TParams<User> = {}): Promise<User[]> {
  const serializedParams = serializeParams(params);
  const searchParams = objectToSearchParams(
    transformValuesToString(serializedParams)
  );

  const response = await fetch(`${BASE_URL}?${searchParams}`, {
    method: "GET",
  });
  return response.json();
}

export async function getTodosById(
  id: User["id"],
  params: TParams<Todo> = {}
): Promise<Todo[]> {
  const serializedParams = serializeParams(params);
  const searchParams = objectToSearchParams(
    transformValuesToString(serializedParams)
  );

  const response = await fetch(`${BASE_URL}/${id}/todos?${searchParams}`);
  return response.json();
}
