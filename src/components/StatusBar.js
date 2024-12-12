import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { day: "Monday", completed: 5, Incompletd: 4 },
  { day: "Tuesday", completed: 7, Incompletd: 6 },
  { day: "Wednesday", completed: 6, Incompletd: 5 },
  { day: "Thursday", completed: 8, Incompletd: 7 },
  { day: "Friday", completed: 4, Incompletd: 4 },
  { day: "Saturday", completed: 3, Incompletd: 2 },
  { day: "Sunday", completed: 2, Incompletd: 1 },
];

const StatusBar = () => {
  return (
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="completed" fill="#2196f3" name="Completed Tasks" />
    </BarChart>
  );
};

export default StatusBar;
