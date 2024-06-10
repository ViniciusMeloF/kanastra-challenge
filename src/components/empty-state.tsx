import Shield from "@/assets/shield.png";
import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ description, title }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <img
        src={Shield}
        alt={title || t("emptyState.title")}
        className="w-48 h-48 text-gray-400 dark:text-gray-600"
      />
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">
          {title || t("emptyState.title")}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {description || t("emptyState.description")}
        </p>
      </div>
    </div>
  );
}
