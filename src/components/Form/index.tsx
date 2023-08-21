import { Component } from "solid-js";

export interface FormProps {
  onSubmit: (e: SubmitEvent) => void;
}

const Form: Component<FormProps> = ({ onSubmit }) => {
  return (
    <form
      class="flex bg-neutral-50 rounded-md overflow-hidden mb-4"
      onSubmit={onSubmit}
    >
      <input
        class="flex-1 px-4 py-3 border border-r-0 rounded-l-md bg-transparent"
        name="title"
        placeholder="Todo title"
        required
      />
      <button class="px-4 py-3 bg-teal-800 hover:bg-teal-900 text-white">
        Add
      </button>
    </form>
  );
};
export default Form;
