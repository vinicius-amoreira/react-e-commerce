import { IProductReview } from "../interfaces/productReview.interface";
import { RatingStars } from "./RatingStars";

interface CommentProps {
  review: IProductReview;
}

export function Comment({ review }: CommentProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div>
          <h6 className="mb-1">{review.reviewerName}</h6>
          <RatingStars rating={review.rating} />
        </div>
        <span className="text-sm">{new Date(review.date).toLocaleDateString()}</span>
      </div>

      <div>
        <p>{review.comment}</p>
      </div>
    </div>
  );
}
