export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export enum Filter {
  "all" = "all",
  "completed" = "completed",
  "uncompleted" = "uncompleted",
}

export type TodoStore = {
  length: number;
  todos: Todo[];
  filter?: Filter;
  editingId?: string;
};
