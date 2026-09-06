import type React from "react";
import { format } from "date-fns";

const TimeAndDate: React.FC = () => {
  const now = new Date();
  const time = format(now, "h:mm");
  const amPm = format(now, "a");
  const date = format(now, "EEEE, d MMM");
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-15 py-4 rounded-xl flex flex-col justify-center items-center gap-3">
      <div className="flex items-end gap-2">
        <p className="font-extrabold text-5xl">{time}</p>
        <p>{amPm}</p>
      </div>
      <div className="opacity-70 animate-pulse">{date}</div>
    </div>
  );
};

export default TimeAndDate;
