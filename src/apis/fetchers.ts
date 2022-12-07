export type Prefecture = { prefCode: number; prefName: string };
export type Population = {
  label: string;
  data: Array<{ year: number; value: number }>;
};

export const fetchPrefectures = async () => {
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
      },
    }
  );
  const { result } = await res.json();
  return result;
};

export const fetchPopulation = async (prefectures: Prefecture[]) => {
  console.log({ prefectures });
  const populations: Population[] = [];
  if (prefectures.length <= 0) {
    return populations;
  }

  for (const pref of prefectures) {
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${pref.prefCode}`,
      {
        headers: {
          'X-API-KEY': import.meta.env.VITE_API_KEY,
        },
      }
    );
    const { result } = await res.json();
    populations.push({
      ...result.data[0],
      label: pref.prefName,
    });
  }

  return populations;
};
