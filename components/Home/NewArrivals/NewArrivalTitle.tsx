import Link from "next/link";

export default function NewArrivalTitle() {
  return (
    <div className="flex items-center justify-between mb-7">
      <div>
        <h2 className="text-xl font-semibold xl:text-heading-5 text-dark-6">
          New Arrivals
        </h2>
      </div>
      <Link
        className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-lg border-gray-3 border bg-gray-1 text-dark-6 ease-out duration-200 hover:bg-green-bright hover:text-white hover:border-transparent"
        href="/shop-with-sidebar"
      >
        View All
      </Link>
    </div>
  );
}
