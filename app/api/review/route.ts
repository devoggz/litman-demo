import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productSlug } = body;

  try {
    // Dynamically import the reviews data
    const reviewsModule = await import("@/app/lib/local-db/data/reviews.json");
    const allReviews = reviewsModule.default;

    // Filter reviews by productSlug and isApproved
    const reviews = allReviews.filter(
      (review: any) => review.productSlug === productSlug && review.isApproved,
    );

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { message: "No reviews found", review: [] },
        { status: 200 },
      );
    }

    return NextResponse.json({ review: reviews }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
