// components/QuickViewButton.tsx

import Tooltip from "./Tooltip";

import { EyeIcon } from "@/app/assets/icons";

const QuickViewButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip content="Quick View" placement="top">
      <button
        className="flex items-center justify-center h-[38px] w-[38px] rounded-lg border border-gray-200 bg-white text-dark-6 hover:text-green-bright transition"
        onClick={onClick}
      >
        <EyeIcon />
      </button>
    </Tooltip>
  );
};

export default QuickViewButton;
