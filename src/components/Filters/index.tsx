import { Accessor, Component, Show } from "solid-js";
import { Filter } from "../../types";

export interface FiltersProps {
  totalCount: number;
  remainingCount: Accessor<number>;
  clearCompleted: () => void;
  toggleAll: (completed: boolean) => void;
  onFilter: (type: Filter) => void;
}

const Filters: Component<FiltersProps> = ({
  totalCount,
  remainingCount,
  onFilter,
  toggleAll,
  clearCompleted,
}) => {
  return (
    <div class="py-2 px-3 flex justify-between items-center bg-neutral-100 rounded-md mb-8">
      <div class="flex items-center">
        <input
          class="w-5 h-5 cursor-pointer"
          type="checkbox"
          checked={!remainingCount()}
          onInput={({ target: { checked } }) => toggleAll(checked)}
        />
      </div>
      <div class="flex items-center gap-2">
        <Show when={remainingCount() !== totalCount}>
          <button
            class="bg-neutral-200 hover:bg-neutral-300 text-sm px-3 py-1 rounded-md"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </Show>
        <select
          class="p-1 bg-neutral-200 text-sm rounded-md capitalize"
          onchange={(e) => onFilter(e.target.value as Filter)}
        >
          {Object.values(Filter).map((filter) => (
            <option value={filter}>{filter}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Filters;
