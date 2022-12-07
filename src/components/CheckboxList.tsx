import { Component, Accessor, Setter, For, Resource } from 'solid-js';
import { Prefecture } from '@apis/fetchers';
import { CheckBox } from './Checkbox';

interface CheckboxListProps {
  listItems: Resource<Prefecture[]>;
  selectedPrefectures: Accessor<Prefecture[]>;
  setSelectedPrefectures: Setter<Prefecture[]>;
}

export const CheckboxList: Component<CheckboxListProps> = (props) => {
  const findSelectedPrefecture = (id: number) => {
    if (!props.selectedPrefectures()) {
      return false;
    }
    return (
      props.selectedPrefectures()?.find((item) => item.prefCode === id) !==
      undefined
    );
  };

  const addSelectedId = (id: number) => {
    const prefecture = props.listItems()?.find((item) => item.prefCode === id);
    if (prefecture) {
      props.setSelectedPrefectures((prev) => {
        const ids = [...prev, prefecture];
        ids.sort();
        return ids;
      });
    }
  };

  const removeSelectedId = (id: number) => {
    const idx = props.listItems()?.findIndex((item) => item.prefCode === id);
    if (idx && idx >= 0) {
      props.setSelectedPrefectures((prev) => {
        const ids = [...prev];
        ids.splice(idx, 1);
        return ids;
      });
    }
  };

  return (
    <div class="py-4 px-8 max-h-[80vh] flex flex-col flex-wrap border-2 border-zinc-500 w-full rounded-lg overflow-scroll">
      <For each={props.listItems()}>
        {(item) => (
          <CheckBox
            label={item.prefName}
            checked={findSelectedPrefecture(item.prefCode)}
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
