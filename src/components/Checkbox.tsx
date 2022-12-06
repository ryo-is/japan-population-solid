import { Component } from 'solid-js';

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (bool: boolean) => void;
}

export const CheckBox: Component<CheckBoxProps> = (props) => {
  return (
    <div class="flex items-center space-x-2 my-1">
      <input
        type="checkbox"
        checked={props.checked}
        class="checkbox checkbox-primary border-zinc-400 hover:border-zinc-200 border-2"
        onChange={(e) => props.onChange(e.currentTarget.checked)}
        id={props.label}
      />
      <label class="label-text cursor-pointer" for={props.label}>
        {props.label}
      </label>
    </div>
  );
};
