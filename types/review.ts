// types/review.ts

export interface IReview {
  id: string;
  productSlug: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}
