import { HTMLAttributes, ReactNode } from "react";

type ListNativeProps = Omit<HTMLAttributes<HTMLUListElement>, "children">;
type ListProps<TItem> = {
  children: (item: TItem) => ReactNode;
  items: TItem[];
};

type ItemNativeProps = HTMLAttributes<HTMLLIElement>;

function List<TItem>({
  children,
  items,
  ...rest
}: ListNativeProps & ListProps<TItem>) {
  return <ul {...rest}>{items.map((item) => children(item))}</ul>;
}

function Item({ children, ...rest }: ItemNativeProps) {
  return <li {...rest}>{children}</li>;
}

List.Item = Item;

export default List;
