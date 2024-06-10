export const ITEMS_PER_PAGE = 20;

export const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  const position = element?.offsetTop;

  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
};
