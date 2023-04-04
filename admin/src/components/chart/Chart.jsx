import "./chart.css";
import {
	AreaChart,
	Area,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	YAxis,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {
	return (
		<div className="chart">
			<h3 className="chartTitle">{title}</h3>
			<ResponsiveContainer width="100%" aspect={3 / 1}>
				<AreaChart
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<XAxis dataKey="name" stroke="#000" />
					<YAxis
						stroke="#000"
						domain={[
							0,
							Math.max(...data.map((item) => Math.round(item.total))),
						]}
					/>
					<Area
						type="monotone"
						dataKey={dataKey}
						stroke="#000"
						dot={true}
						fill="#BABABA"
						activeDot={{
							r: 9,
							stroke: "#000",
							strokeWidth: 2,
							fill: "#fff",
						}}
						active
					/>
					<Tooltip
						cursor={{
							stroke: "#000",
						}}
						contentStyle={{
							backgroundColor: "#fff",
							border: "none",
							color: "#000",
							borderRadius: "3px",
							padding: "10px",
							textAlign: "center",
							fontSize: "16px",
							fontWeight: "500",
							fontFamily: "sans-serif",
						}}
					/>
					{grid && <CartesianGrid stroke="#e0dfdf" />}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
