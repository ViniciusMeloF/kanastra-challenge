import { cn } from "@/lib/utils";
import React from "react";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  thickness?: "thin" | "medium" | "thick";
}

const Divider: React.FC<DividerProps> = ({
  className = "",
  orientation = "horizontal",
  thickness = "thin",
}) => {
  const baseStyles = "bg-gray-300";
  const orientationStyles =
    orientation === "horizontal" ? "w-full h-0.5" : "h-full w-0.5";
  const thicknessStyles =
    thickness === "thin" ? "h-0.5" : thickness === "medium" ? "h-1" : "h-2";

  return (
    <div
      className={cn(baseStyles, orientationStyles, thicknessStyles, className)}
      aria-orientation={orientation}
    />
  );
};

export default Divider;
