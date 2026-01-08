"use client";

import { ChangeEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { fetcher } from "../../../utils/fetcher";
import useSWR from "swr";
import { Loader } from "lucide-react";
import Link from "next/link";

interface Genre {
  id: number;
  name: string;
}

export const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = useSWR(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcher
  );

  console.log(data);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchGenres = async () => {
      {
        const genre = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
            },
          }
        );

        const data = await genre.json();
        setGenres(data.genres || []);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="w-full h-[59px] flex flex-row justify-between pr-4 pl-4 bg-[#FFFFFF] items-center">
      <div className="w-full h-[36px] flex flex-row justify-between bg-[#FFFFFF] items-center">
        <Link href="/">
          <div className="w-[92px] h-[20px] flex flex-row gap-2 items-center ">
            <img className="w-[20px] h-[15px]" src="/film.png" alt="" />
            <div className="text-[#4338CA] text-base font-bold">Movie Z</div>
          </div>
        </Link>
        <div className="w-[488px] h-[36px] flex flex-row gap-3 relative justify-center items-center">
          <Button
            className="bg-white text-black border border-gray-300 w-24.15 h-9"
            onClick={toggle}
          >
            {isOpen ? <ChevronDown /> : <ChevronUp />}
            Genre
            {isOpen && (
              <div className="absolute top-full mt-1 left-0 w-144.25 h-87.5 bg-white rounded-lg shadow-lg border border-gray-300 z-50 flex flex-col p-5 gap-4">
                <div className="w-53.25 h-15 flex flex-col">
                  <h3 className="flex text-[24px] font-semibold">Genres</h3>
                  <div className="text-[16px] font-normal flex text-foreground">
                    See lists of movies by genre
                  </div>
                </div>
                <div className="border w-134.25 h-px border-gray-200"></div>
                <div className="w-134.25 flex gap-4 flex-wrap">
                  {genres.map((num) => (
                    <Badge
                      key={num.id}
                      className="bg-white border border-gray-300 text-black"
                    >
                      {num.name} <ChevronRight />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Button>
          {/* <button className="w-[97px] h-[36px] border rounded-sm pt-2 pr-4 pb-2 pl-4 flex gap-2 bg-[#FFFFFF] border-[#E4E4E7] items-center">
            <img className="w-[16px] h-[16px]" src="chevron-down.png" alt="" />
            <div className="w-[41px] h-[20px] text-[14px] text-normal text-[#18181B]">
              Genre
            </div>
          </button> */}
          <div className="w-[379px] h-[36px] border flex pr-3 pl-3 gap-[10px] border-[#E4E4E7] bg-[#FFFFFF] rounded-lg items-center ">
            {isLoading && <Loader />}
            <img className="w-[16px] h-[16px]" src="/search.png" alt="" />
            <input
              onChange={handleChange}
              type="text"
              className="w-full h-full pt-2 pb-2 flex gap-[10px] text-normal text-[14px] text-[#71717A] "
              placeholder="Search.."
            />
            {/* <div>
              {isLoading && <Loader />}
              <input onChange={handleChange} />
            </div> */}
          </div>
        </div>
        <button className="w-[36px] h-[36px] flex justify-center items-center border rounded-md border-[#E4E4E7] bg-[#FFFFFF] ">
          <img className="w-[16px] h-[16px]" src="/moon.png" alt="" />
        </button>
      </div>
    </div>
  );
};
