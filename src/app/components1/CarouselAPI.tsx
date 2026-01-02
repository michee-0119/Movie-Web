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
