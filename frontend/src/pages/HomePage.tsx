import { useEffect } from "react";
import useGetData from "../api/useGetData";
import { Bar } from "react-chartjs-2";
import {
  type ChartData,
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

type Stat = {
  title: string;
  value: number;
};

const HomePage = () => {
  const { getResults, results, participation, totalUsers, totalVoted, totalUsersHasNotVote } =
    useGetData();

  Chart.register(
    LinearScale,
    CategoryScale, // You might need other scales like CategoryScale depending on your chart type
    BarElement, // Register elements like BarElement, LineElement, PointElement, etc., as needed
    Title,
    Tooltip,
    Legend
  );

  const stats: Stat[] = [
    {
      title: "Total Suara Masuk",
      value: participation,
    },
    {
      title: "Total User",
      value: totalUsers,
    },
    {
      title: "Total User Memilih",
      value: totalVoted,
    },
    {
      title: "Total User Belum Memilih",
      value: totalUsersHasNotVote,
    }
  ];

  useEffect(() => {
    getResults();
  }, []);

  const data: ChartData<"bar"> = {
    labels: results.map((result) => result.name),
    datasets: [
      {
        label: "Jumlah Suara",
        data: results.map((result) => result.votes),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <div className="w-full text-center stats stats-vertical lg:stats-horizontal shadow bg-base-100 mb-10">
        {stats.map((stat) => (
          <div
            className="stat flex flex-col justify-center items-center"
            key={stat.title}
          >
            <div className="stat-value">{stat.value}</div>
            <div className="stat-title text-base font-semibold">
              {stat.title}
            </div>
          </div>
        ))}
      </div>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Jumlah Suara",
            },
          },
        }}
        height={"100%"}
      />
    </div>
  );
};

export default HomePage;
