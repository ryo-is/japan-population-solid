import { Component, createResource, createSignal, Show } from 'solid-js';
import { fetchPrefectures, Prefecture, fetchPopulation } from '@apis/fetchers';
import { CheckboxList } from '@components/CheckboxList';
import { Chart } from '@components/Chart';

export const TogPage: Component = () => {
  const [prefectures] = createResource<{ result: Prefecture[] }>(
    fetchPrefectures
  );
  const [selectedIds, setSelectedIds] = createSignal<number[]>([]);
  const [populations] = createResource(selectedIds, fetchPopulation);

  const clearAllSelectedIds = () => {
    setSelectedIds([]);
  };

  return (
    <>
      <Show when={!prefectures.loading} fallback={<div>loading...</div>}>
        <div class="flex space-x-4">
          <div class="w-1/5">
            <div class="mb-4 flex justify-between items-center">
              <div>Prefectures</div>
              <div class="btn btn-primary" onClick={clearAllSelectedIds}>
                Clear All
              </div>
            </div>
            <CheckboxList
              listItems={prefectures()?.result || []}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </div>
          <div class="w-4/5">
            <Chart populations={populations} />
          </div>
        </div>
      </Show>
    </>
  );
};
