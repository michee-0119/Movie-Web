import { UpComing } from "./UpComing";
import { Popular } from "./Popular";
import { TopRated } from "./TopRated";

export const MovieCard = () => {
  return (
    <div>
      <UpComing />
      <Popular />
      <TopRated />
    </div>
  );
};
