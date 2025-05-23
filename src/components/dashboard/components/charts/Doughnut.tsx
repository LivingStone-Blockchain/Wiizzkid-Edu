import React, { FC, useState, useContext } from "react";
import { QuizContext, QuizContextType } from "../../../../context/quiz.context";
import {
  WiizzkidContext,
  WiizzkidContextType,
} from "../../../../context/wiizzkid.context";
import {
  TimestableContext,
  TimestableContextType,
} from "../../../../context/timestable.context";
import { ChartLegend, ChartCard } from "../Cards";
import { doughnutLegends } from "./chartData";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { apiChartData as quizApiChartData } from "../../data/quizChartData";
import { apiChartData as timestableApiChartData } from "../../data/timeTableChartData";

//element registration
Chart.register(...registerables);

const DoughnutChart = () => {
  const { quizRecentGames } = useContext(QuizContext) as QuizContextType;
  const { timestableRecentGames } = useContext(
    TimestableContext
  ) as TimestableContextType;
  const { dashBoardMode } = useContext(WiizzkidContext) as WiizzkidContextType;

  const currentYear = new Date().getFullYear();

  //returns data for a year
  const dataPerYear = dashBoardMode
    ? timestableApiChartData(timestableRecentGames!)?.filter(
        (item) => new Date(item.created_at).getFullYear() === currentYear
      )
    : quizApiChartData(quizRecentGames!)?.filter(
        (item) => new Date(item.created_at).getFullYear() === currentYear
      );

  const gameModeType = dataPerYear.map((item) => item.game_mode); // returns month of each game played for a year
  const uniqueGameModes = new Set(gameModeType);
  const counts = [];

  for (const unique of uniqueGameModes) {
    const filteredGameModes = gameModeType.filter((item) => item === unique);
    counts.push({ mode: unique, count: filteredGameModes.length });
  }

  const modeCount = counts.map((item) => item.count);

  const [data, setData] = useState({
    datasets: [
      {
        label: "Games per mode",
        data: modeCount,
        backgroundColor: !dashBoardMode
          ? ["#0694a2", "#e0b00d", "#ff3939"]
          : ["#0694a2", "#ff3939", "#e0b00d"],
        borderColor: ["#252641"],
        cutout: "80%",
        radius: 100,
        borderWidth: 3,
      },
    ],
  });

  return (
    <>
      <ChartCard title="Modes played">
        <div className="flex justify-center items-center mx-auto w-56 h-56">
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </div>
        <ChartLegend legends={doughnutLegends} />
      </ChartCard>
    </>
  );
};

export default DoughnutChart;
