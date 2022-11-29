import { Component, Accessor, Setter, For } from 'solid-js';
import { Prefecture } from '@apis/fetchers';
import { CheckBox } from './Checkbox';

interface CheckboxListProps {
  listItems: Prefecture[];
  selectedIds: Accessor<number[]>;
  setSelectedIds: Setter<number[]>;
}

export const CheckboxList: Component<CheckboxListProps> = (props) => {
  const findSelectedId = (id: number) => {
    return props.selectedIds().includes(id);
  };

  const addSelectedId = (id: number) => {
    props.setSelectedIds((prev) => {
      const ids = [...prev];
      if (!findSelectedId(id)) {
        ids.push(id);
      }
      ids.sort();
      return ids;
    });
  };

  const removeSelectedId = (id: number) => {
    props.setSelectedIds((prev) => {
      const ids = [...prev];
      const idx = ids.indexOf(id);
      if (idx < 0) {
        return ids;
      }
      ids.splice(idx, 1);
      return ids;
    });
  };

  return (
    <div class="py-4 px-8 max-h-[80vh] flex flex-col flex-wrap border-2 border-zinc-500 w-full rounded-lg overflow-scroll">
      <For each={props.listItems}>
        {(item) => (
          <CheckBox
            label={item.prefName}
            checked={findSelectedId(item.prefCode)}
            onChange={(checked: boolean) => {
              if (checked) {
                addSelectedId(item.prefCode);
              } else {
                removeSelectedId(item.prefCode);
              }
            }}
          />
        )}
      </For>
    </div>
  );
};
