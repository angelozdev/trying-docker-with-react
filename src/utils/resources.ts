type Status = "pending" | "resolved" | "rejected";
type State<TData> = {
  status: Status;
  data: TData | null;
  error: Error | null;
};

export type TResource<TData> = ReturnType<typeof createResource<TData>>;

function sleep<T>(data: T): Promise<T> {
  const randomTime = Math.floor(Math.random() * 1000);
  return new Promise((resolve) => setTimeout(() => resolve(data), randomTime));
}

function shouldFail(): boolean {
  return Math.random() > 0.9;
}

export function createResource<Type>(promise: Promise<Type>) {
  const state: State<Type> = {
    status: "pending",
    data: null,
    error: null,
  };

  promise
    .then(sleep)
    .then((data) => {
      state.status = "resolved";
      state.data = data;
    })
    .catch((error: Error) => {
      state.status = "rejected";
      state.error = error;
    });

  return {
    read() {
      if (state.status === "pending") throw promise;
      if (state.status === "rejected") throw state.error;
      return state.data as Type;
    },
  };
}
