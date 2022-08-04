import { memo } from "react";

import { List } from "@features/ui";
import { Todo } from "@typings";
import { TResource } from "@/hooks";

// types
type TodoListProps = {
  todosResource: TResource<Todo[]>;
};

type ItemProps = {
  title: Todo["title"];
  isCompleted: Todo["completed"];
};

function TodoList({ todosResource }: TodoListProps) {
  const todos = todosResource.read();

  return (
    <List className="ml-4" items={todos}>
      {({ id, title, completed }) => (
        <TodoItem key={id} title={title} isCompleted={completed} />
      )}
    </List>
  );
}

const TodoItem = memo<ItemProps>(({ title, isCompleted }) => {
  return (
    <List.Item>
      <p>
        {isCompleted ? "✅" : "❌"} {title}
      </p>
    </List.Item>
  );
});

TodoItem.displayName = "TodoItem";

export default TodoList;
