import { MovieCard } from "./components1/MovieCard";
import { Carousel } from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="flex items-center flex-col pt-[52px]">
      <Carousel />
      <img className="w-full h-[600px]" src="wicked.jpg" alt="" />
      <MovieCard />
    </div>
  );
}
