import Chart from "../../components/chart/Chart";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Analytics() {
	const [userStats, setUserStats] = useState([]);
	const [userStatsDay, setUserStatsDay] = useState([]);

	const MONTHS = useMemo(
		() => [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Agu",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		[],
	);

	const DAY = useMemo(
		() => [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
		],
		[],
	);
	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get("/users/stats");
				res.data.map((item) =>
					setUserStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], "Active User": item.total },
					]),
				);
			} catch {}
		};
		getStats();
	}, [MONTHS]);

	useEffect(() => {
		const getStats2 = async () => {
			try {
				const res = await userRequest.get("/users/statsDay");
				res.data.map((item) =>
					setUserStatsDay((prev) => [
						...prev,
						{ name: DAY[item._id - 1], "Active User": item.total },
					]),
				);
			} catch {
				console.log("error");
			}
		};
		getStats2();
	}, [DAY]);

	return (
		<div className="home">
			<Chart
				data={userStats}
				title="User Monthly Analytics"
				grid
				dataKey="Active User"
			/>
			<Chart
				data={userStatsDay}
				title="User Days Analytics"
				grid
				dataKey="Active User"
			/>
		</div>
	);
}
