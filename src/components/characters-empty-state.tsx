import Shield from "@/assets/shield.png";

export function CharactersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <img
        src={Shield}
        alt="No characters"
        className="w-48 h-48 text-gray-400 dark:text-gray-600"
      />
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">No Marvel Characters Found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like there are no Marvel characters to display at the moment.
        </p>
      </div>
    </div>
  );
}
