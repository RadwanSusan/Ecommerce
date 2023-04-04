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
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
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
		],
		[],
	);
    // useEffect(() => {
	// 	const getStats = async () => {
	// 		try {
	// 			const res = await userRequest.get("/users/stats");
	// 			res.data.map((item) =>
    //             setUserStatsDay((prev) => [
	// 					...prev,
	// 					{ name: DAY[item._id - 1], "Active User": item.total },
	// 				]),
	// 			);
	// 		} catch {}
	// 	};
	// 	getStats();
	// }, [DAY]);



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
	return (
		<div className="home">
			
			<Chart
				data={userStats}
				title="User Monthly Analytics"
				grid
				dataKey="Active User"
			/>
            
		</div>
	);
}
