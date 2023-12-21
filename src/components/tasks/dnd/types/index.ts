export type Status = "ongoing" | "done" | "todo";

export type Task = {
  id: string;
  status: Status;
  title: string;
  priority: string;
  startsAt: string;
  endsAt: string;
  description: string;
  user: string | undefined;
};

export type BoardSections = {
  [name: string]: Task[];
};
