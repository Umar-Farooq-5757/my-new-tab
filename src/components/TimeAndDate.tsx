import type React from "react";
import { format } from "date-fns";

const TimeAndDate: React.FC = () => {
  const now = new Date();
  const time = format(now, "h:mm");
  const amPm = format(now, "a");
  const date = format(now, "EEEE, d MMM");
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl">
      <div className="flex items-end gap-2">
        <p className="font-extrabold text-4xl">{time}</p>
        <p>{amPm}</p>
      </div>
      <div className="opacity-70">{date}</div>
    </div>
  );
};

export default TimeAndDate;
