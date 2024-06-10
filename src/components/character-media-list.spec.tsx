import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, it } from "vitest";
import { CharacterMediaList } from "./character-media-list";
import { ITEMS_PER_PAGE } from "@/utils/pagination";

describe("CharacterMediaList component tests", () => {
  it("renders media list with loading skeletons when isLoading is true and no media results", () => {
    const media: MarvelApi<Comics | Series> = {
      total: 0,
      limit: ITEMS_PER_PAGE,
      count: 0,
      results: [],
      offset: 0,
    };
    const handleShowMoreMock = vi.fn();

    render(
      <CharacterMediaList
        title="Test Title"
        media={media}
        handleShowMore={handleShowMoreMock}
        isLoading={true}
      />
    );

    const skeletons = screen.getAllByTestId("loading-media-list");
    expect(skeletons).toHaveLength(4);
  });

  it("renders media list with correct title and media results", () => {
    const media: MarvelApi<Comics | Series> = {
      total: 2,
      limit: ITEMS_PER_PAGE,
      count: 2,
      results: [
        {
          id: 1,
          title: "Comic 1",
          thumbnail: { path: "path1", extension: "jpg" },
        },
        {
          id: 2,
          title: "Comic 2",
          thumbnail: { path: "path2", extension: "jpg" },
        },
      ],
      offset: 0,
    };
    const handleShowMoreMock = vi.fn();

    render(
      <CharacterMediaList
        title="Test Title"
        media={media}
        handleShowMore={handleShowMoreMock}
        isLoading={false}
      />
    );

    const titleElement = screen.getByText("Test Title - 2");
    expect(titleElement).toBeInTheDocument();

    const comicElements = screen.getAllByText(/Comic \d/);
    expect(comicElements).toHaveLength(2);
  });
});
