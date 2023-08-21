import { nanoid } from "nanoid";
import { For, createMemo, type Component } from "solid-js";
import Filters from "./components/Filters";
import Form from "./components/Form";
import Header from "./components/Header";
import { createLocalStore } from "./services/store";
import { Filter, Todo, TodoStore } from "./types";

const App: Component = () => {
  const [state, setState] = createLocalStore<TodoStore>({
    length: 0,
    todos: [],
    filter: Filter.all,
  });
  const remainingCount = createMemo(
    () =>
      state.todos.length - state.todos.filter((todo) => todo.completed).length
  );
  const filterList = (todos: Todo[]) => {
    if (state.filter === Filter.uncompleted) {
      return todos.filter((todo) => !todo.completed);
    } else if (state.filter === Filter.completed) {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };
  const removeTodo = (todoId: string) =>
    setState("todos", (t) => t.filter((item) => item.id !== todoId));
  const editTodo = (todo: Partial<Todo>) =>
    setState("todos", (item) => item.id === todo.id, todo);
  const clearCompleted = () =>
    setState("todos", (t) => t.filter((todo) => !todo.completed));
  const toggleAll = (completed: boolean) =>
    setState("todos", (todo) => todo.completed !== completed, { completed });
  const setFilter = (filter: Filter) => setState({ ...state, filter });
  const setEditing = (todoId?: string) => setState("editingId", todoId);
  const onSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    const form = ev.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const title = data.get("title");
    if (title) {
      setState({
        ...state,
        todos: [
          { id: nanoid(), title: title.toString(), completed: false },
          ...state.todos,
        ],
        length: state.length++,
      });
      form.reset();
    }
  };
  const save = (
    todoId: string,
    { target: { value } }: { target: HTMLInputElement }
  ) => {
    const title = value.trim();
    if (state.editingId === todoId && title) {
      editTodo({ id: todoId, title });
      setEditing();
    }
  };
  const toggle = (
    todoId: string,
    { target: { checked } }: { target: HTMLInputElement }
  ) => editTodo({ id: todoId, completed: checked });
  const doneEditing = (todoId: string, e: KeyboardEvent) => {
    if (e.code === "Enter") save(todoId, e as any);
    else if (e.code === "Escape") setEditing();
  };

  return (
    <>
      <Header />
      <div class="my-12 mx-auto max-w-[800px] px-6">
        <Form onSubmit={onSubmit} />
        <Filters
          totalCount={state.todos.length}
          remainingCount={remainingCount}
          clearCompleted={clearCompleted}
          toggleAll={toggleAll}
          onFilter={setFilter}
        />
        <ul class="flex flex-col gap-2">
          <For each={filterList(state.todos)}>
            {(todo) => (
              <li class="p-3 font-lg bg-neutral-50 rounded-md">
                <div class="flex items-center gap-4">
                  <input
                    class="w-5 h-5 cursor-pointer"
                    type="checkbox"
                    checked={todo.completed}
                    onInput={[toggle, todo.id]}
                  />
                  <div
                    onDblClick={
                      todo.completed ? undefined : [setEditing, todo.id]
                    }
                  >
                    <input
                      class="bg-transparent p-2 outline-none readonly-outline-1"
                      value={todo.title}
                      onFocusOut={[save, todo.id]}
                      onKeyUp={[doneEditing, todo.id]}
                      readonly={state.editingId === todo.id}
                      classList={{
                        "line-through": todo.completed,
                        "text-neutral-400": todo.completed,
                      }}
                    />
                  </div>
                  <button
                    class="ml-auto text-xs w-7 h-7 text-center bg-neutral-200 hover:bg-neutral-300 rounded-full"
                    title="Remove"
                    onClick={[removeTodo, todo.id]}
                  >
                    ✕
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
        <div class="mt-6">
          <strong>{remainingCount()}</strong>{" "}
          {remainingCount() === 1 ? " item " : " items "} left
        </div>
      </div>
    </>
  );
};

export default App;
