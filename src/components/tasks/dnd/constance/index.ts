type ITitles = {
  ongoing: string;
  done: string;
  todo: string;
  [key: string]: string; // Add an index signature
};

export const BOARD_SECTIONS: ITitles = {
  ongoing: "On Going",
  todo: "To Do",
  done: "Completed",

};

export function findTitleByKey(key: string) {
  return BOARD_SECTIONS[key] || "Title not found";
}
