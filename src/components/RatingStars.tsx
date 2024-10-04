import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  showRating?: boolean;
}

export function RatingStars({ rating: userRating, showRating = false }: RatingStarsProps) {
  const rating = Math.round(userRating * 2) / 2;
  const stars = Array.from({ length: 5 });

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="flex gap-1">
          {stars.map((_, index) => (
            <Star fill="#d1d5db" className="text-gray-300" size={14} key={index} />
          ))}
        </div>
        <div className="absolute top-0 flex gap-1">
          {stars.map((_, index) => {
            const isFull = index < rating;
            const isHalf = index + 0.5 === rating;

            return isHalf ? (
              <StarHalf fill="#eab308" className="text-yellow-500" size={14} key={index} />
            ) : (
              <Star fill={isFull ? "#eab308" : "#d1d5db"} className={isFull ? "text-yellow-500" : "text-gray-300"} size={14} key={index} />
            );
          })}
        </div>
      </div>

      {showRating && <span className="text-sm">{userRating}</span>}
    </div>
  );
}
