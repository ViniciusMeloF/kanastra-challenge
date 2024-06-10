import { CharacterDetails } from "./components/character-details";
import { EmptyState } from "./components/empty-state";
import { ComicsChartSection } from "./components/comics-chart-section";
import { CharacterListPagination } from "./components/character-list-pagination";
import { CharacterList } from "./components/character-list";
import { HeroSection } from "./components/hero-section";
import { Filters } from "./components/filters";
import { useCharacters } from "./contexts/CharactersContext";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const { STATE_CONTROLLER, DETAILS_CONTROLLER } = useCharacters();

  // useEffect(() => {
  //   const root = window.document.documentElement;

  //   root.classList.remove("light", "dark");

  //   // root.classList.add("dark");
  // }, []);

  return (
    <main id="top" className="min-h-screen ">
      <div className="max-w-7xl m-auto p-6">
        <HeroSection />

        <div>
          <Filters />

          {STATE_CONTROLLER.isError && !STATE_CONTROLLER.isLoading && (
            <EmptyState
              title={t("emptyError.title")}
              description={t("emptyError.description")}
            />
          )}

          {STATE_CONTROLLER.characters.total === 0 &&
          !STATE_CONTROLLER.isError &&
          !STATE_CONTROLLER.isLoading ? (
            <EmptyState />
          ) : (
            <>
              <ComicsChartSection />

              <CharacterList />

              {STATE_CONTROLLER.characters.total > 20 && (
                <CharacterListPagination />
              )}
            </>
          )}
        </div>
      </div>

      {DETAILS_CONTROLLER.isOpen && <CharacterDetails />}
    </main>
  );
}

export default App;
