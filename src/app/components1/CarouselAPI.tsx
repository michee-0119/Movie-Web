import { fetchExternalImage } from "next/dist/server/image-optimizer";

export async function CarouselAPI() {
  const response = await fetch(
    " https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data.results;
}

export async function seeMovieTrailer(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
    }
  );

  const data = await res.json();

  const trailer = data.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "Youtube"
  );

  return trailer?.key || null;
}

export async function seeMovieDetail(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
      cache: "no-store",
    }
  );

  console.log("Movie API response status:", res.status);
  if (!res.ok) return res.json();
}
