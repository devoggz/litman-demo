import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Category } from "@/types/category";

type Props = {
  item: Category;
};

const SingleItem = ({ item }: Props) => {
  return (
    <Link href={"/shop-with-sidebar"}>
      <div className="category-item flex flex-col items-center p-4  transition-shadow rounded-lg">
        <div className="relative w-24 h-24 mb-3">
          <Image
            fill
            alt={item.title}
            className="object-contain"
            src={item.image}
          />
        </div>
        <h3 className="text-sm font-medium text-center">{item.title}</h3>
        {/*{item.productCount > 0 && (*/}
        {/*    <p className="text-xs text-gray-500 mt-1">*/}
        {/*        {item.productCount} products*/}
        {/*    </p>*/}
        {/*)}*/}
      </div>
    </Link>
  );
};

export default SingleItem;

// import Link from "next/link";
// import Image from "next/image";
// import { Category } from "@/types/category";
//
// type Props = {
//     item: Category;
// }
//
// export default function SingleItem({ item }: { item: Category }) {
//     return (
//         <Link href={"/shop-with-sidebar"}>
//             <div className="category-item flex flex-col items-center p-4  transition-shadow rounded-lg">
//                 <div className="relative w-24 h-24 mb-3">
//                     <Image
//                         src={item.image}
//                         alt={item.title}
//                         fill
//                         className="object-contain"
//                     />
//                 </div>
//                 <h3 className="text-sm font-medium text-center">{item.title}</h3>
//                 {/*{item.productCount > 0 && (*/}
//                 {/*    <p className="text-xs text-gray-500 mt-1">*/}
//                 {/*        {item.productCount} products*/}
//                 {/*    </p>*/}
//                 {/*)}*/}
//             </div>
//         </Link>
//     );
// }
