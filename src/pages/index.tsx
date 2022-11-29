import { Component, createResource, createSignal, Show } from 'solid-js';
import { fetchPrefectures, Prefecture } from '@apis/fetchers';
import { CheckboxList } from '@components/CheckboxList';

export const TogPage: Component = () => {
  const [prefectures] = createResource<{ result: Prefecture[] }>(
    fetchPrefectures
  );
  const [selectedIds, setSelectedIds] = createSignal<number[]>([]);

  return (
    <>
      <Show when={!prefectures.loading} fallback={<div>loading...</div>}>
        <div class="flex space-x-4">
          <div class="w-1/5">
            <div class="mb-2">Prefectures</div>
            <CheckboxList
              listItems={prefectures()?.result || []}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>
          <div class="w-4/5">
            <div class="w-full h-full bg-zinc-500" />
          </div>
        </div>
      </Show>
    </>
  );
};
