import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
	const [income, setIncome] = useState([]);
	const [perc, setPerc] = useState(0);
	const [percOrgin, setPercOrgin] = useState(0);
	const [revPerc, setRevSetPerc] = useState(0);



	useEffect(() => {
		const getIncome = async () => {
			try {

				const res = await userRequest.get("orders/income");
				res.data.sort((a, b) => a._id - b._id);
				let lastindex = res.data.length - 1;
				console.log(lastindex );
				setIncome(res.data);
				console.log(res.data);
				setPerc((res.data[lastindex].total * 100) / res.data[lastindex-1].total - 100);
				setPercOrgin((res.data[lastindex].totalOrgin * 100) / res.data[lastindex - 1].totalOrgin - 100);
				setRevSetPerc( res.data[lastindex].total - res.data[lastindex].totalOrgin);
				console.log(perc);
				console.log(percOrgin);
				console.log(revPerc);

				
				


			} catch {}
		};
		getIncome();
	}, []);
	console.log("income", income);
	console.log("perc", perc);

	return (
		<div className="featured">
			<div className="featuredItem">
				<span className="featuredTitle">Revanue</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">${income[1]?.total - income[1]?.totalOrgin }</span>
					<span className="featuredMoneyRate">
						{/* %{Math.floor(perc - percOrgin)}{" "} */}
						{(revPerc) < 0 ? (
							<ArrowDownward className="featuredIcon negative" />
						) : (
							<ArrowUpward className="featuredIcon" />
						)}
					</span>
				</div>
				<span className="featuredSub">Compared to last month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Sales</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">${income[1]?.total}</span>
					<span className="featuredMoneyRate">
					%{Math.floor(perc)}{" "}
						{perc < 0 ? (
							<ArrowDownward className="featuredIcon negative" />
						) : (
							<ArrowUpward className="featuredIcon" />
						)}
					</span>
				</div>
				<span className="featuredSub">Compared to last month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Cost</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">${income[1]?.totalOrgin}</span>
					<span className="featuredMoneyRate">
					%{Math.floor(percOrgin)}{" "}
						{percOrgin < 0 ? (
							<ArrowDownward className="featuredIcon negative" />
						) : (
							<ArrowUpward className="featuredIcon" />
						)}
					</span>
				</div>
				<span className="featuredSub">Compared to last month</span>
			</div>
		</div>
	);
}
