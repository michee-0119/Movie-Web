"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const imageBase = "https://image.tmdb.org/t/p/original";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  voteAverage: number;
};

export function PlayCarousel({ movies }: { movies: Movie }) {
  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full h-[600px]"
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <img
              src={`${imageBase}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[600px]"
            />
            <div className="absolute bottom-24 text-white flex flex-col h-[264px] mb-20 ml-[140px]">
              <p className="text-[#FFFFFF] text-[16px] font-normal">
                Now Playing:
              </p>
              <h1 className="text-[36px] font-bold w-[410px]">{movie.title}</h1>

              <p className="flex text-{#FFFFF} text-[18px] mb-4">
                {/* ⭐ {movie.voteAverage.toFixed(1)} /10 */}
                <p className="text-[#71717A] text-[16px]"></p>
              </p>

              <p className="text-[#FAFAFA] text-[12px] w-[302px] pb-[16px]">
                {movie.overview}
              </p>
              <button className="w-[145px] bg-white text-black flex items-center justify-center gap-[11.33px] font-medium rounded-md py-[5px] cursor-pointer">
                <img
                  className="w-[9.33px] h-[12px]"
                  src="play-button.png"
                  alt=""
                />
                <h6 className="text-[14px] font-normal">Watch Trailer</h6>
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-[100px]" />
      <CarouselNext className="mr-[100px]" />
    </Carousel>
  );
}
