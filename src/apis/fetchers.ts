export type Prefecture = { prefCode: number; prefName: string };

export const fetchPrefectures = async () =>
  (
    await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
      },
    })
  ).json();
