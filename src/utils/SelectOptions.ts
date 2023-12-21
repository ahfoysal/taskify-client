export interface PriorityOption {
    label: string;
    value: string;
  }
  
  export const priorityOptions: PriorityOption[] = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "Critical", value: "critical" },
    { label: "Urgent", value: "urgent" },
  ];
  
  export const colorOptions: string[] = [
    "blue", "purple", "cyan", "green", "magenta", "pink", "red",
    "orange", "yellow", "volcano", "geekblue", "lime", "gold"
  ];
  
  const priorityColorMap: Record<string, string> = {
    high: "red",
    medium: "orange",
    low: "yellow",
    normal: "green",
    critical: "volcano",
    urgent: "magenta",
  };
  
  export const getColorByPriority = (priority: string): string => {
    return priorityColorMap[priority] || "blue";
  };
      