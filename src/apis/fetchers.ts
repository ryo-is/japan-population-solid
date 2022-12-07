export type Prefecture = { prefCode: number; prefName: string };
export type Population = {
  label: string;
  data: Array<{ year: number; value: number }>;
};

export const fetchPrefectures = async () =>
  (
    await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
      },
    })
  ).json();

export const fetchPopulation = async (prefCodes: number[]) => {
  const populations: Population[] = [];
  if (prefCodes.length <= 0) {
    return populations;
  }

  const fetchPromises: Promise<Response>[] = [];

  prefCodes.forEach((code) => {
    fetchPromises.push(
      fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${code}`,
        {
          headers: {
            'X-API-KEY': import.meta.env.VITE_API_KEY,
          },
        }
      )
    );
  });
  const res = await Promise.all(fetchPromises);

  const jsonPromises: Promise<{ result: { data: Population[] } }>[] = [];
  res.forEach((value) => {
    jsonPromises.push(value.json());
  });
  const jsonResponses = await Promise.all(jsonPromises);
  jsonResponses.forEach(({ result }) => {
    populations.push(result.data[0]);
  });
  console.log(populations);
  return populations;
};
