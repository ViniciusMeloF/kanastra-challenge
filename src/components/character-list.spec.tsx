/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, MockInstance } from "vitest";
import { CharacterList } from "./character-list";
import * as useCharactersHook from "@/contexts/CharactersContext";
import { MARVEL_INITIAL_STATE } from "@/utils/constants";

describe("CharacterList Component", () => {
  it("should be able renders loading skeletons when isLoading is true", () => {
    const useCharactersSpy: MockInstance<[], any> = vi.spyOn(
      useCharactersHook,
      "useCharacters"
    );
    useCharactersSpy.mockReturnValue({
      STATE_CONTROLLER: { isLoading: true, characters: MARVEL_INITIAL_STATE },
    });

    render(<CharacterList />);

    const skeletons = screen.getAllByTestId("character-list-loading");
    expect(skeletons).toHaveLength(4);
  });

  it("should be able renders characters when isLoading is false", () => {
    const useCharactersSpy: MockInstance<[], any> = vi.spyOn(
      useCharactersHook,
      "useCharacters"
    );
    useCharactersSpy.mockReturnValue({
      STATE_CONTROLLER: {
        isLoading: false,
        characters: {
          results: [
            {
              id: 1,
              name: "Character One",
              thumbnail: { path: "path/to/image1", extension: "jpg" },
            },
            {
              id: 2,
              name: "Character Two",
              thumbnail: { path: "path/to/image2", extension: "jpg" },
            },
          ],
        },
      } as any,
      DETAILS_CONTROLLER: { handleOpen: vi.fn() } as any,
    });

    render(<CharacterList />);

    const characterNames = screen.getAllByText(/Character/i);
    expect(characterNames).toHaveLength(2);

    const characterImages = screen.getAllByRole("img");
    expect(characterImages).toHaveLength(2);
    expect(characterImages[0]).toHaveAttribute("src", "path/to/image1.jpg");
    expect(characterImages[1]).toHaveAttribute("src", "path/to/image2.jpg");
  });

  it("should be able calls handleOpen when a character is clicked", () => {
    const handleOpenMock = vi.fn();
    const useCharactersSpy: MockInstance<[], any> = vi.spyOn(
      useCharactersHook,
      "useCharacters"
    );

    useCharactersSpy.mockReturnValue({
      STATE_CONTROLLER: {
        isLoading: false,
        characters: {
          results: [
            {
              id: 1,
              name: "Character One",
              thumbnail: { path: "path/to/image1", extension: "jpg" },
            },
          ],
        },
      },
      DETAILS_CONTROLLER: { handleOpen: handleOpenMock },
    });

    render(<CharacterList />);

    const character = screen.getByText("Character One");
    fireEvent.click(character);

    expect(handleOpenMock).toHaveBeenCalledWith({
      id: 1,
      name: "Character One",
      thumbnail: { path: "path/to/image1", extension: "jpg" },
    });
  });
});
