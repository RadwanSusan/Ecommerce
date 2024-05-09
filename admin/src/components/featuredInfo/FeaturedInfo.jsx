import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
export default function FeaturedInfo() {
	const [income, setIncome] = useState([]);
	const [perc, setPerc] = useState(0);
	const [percOrgin, setPercOrgin] = useState(0);
	const [revPerc, setRevSetPerc] = useState(0);
	let lastindex = 0;
	const [supplierId, setSupplierId] = useState(null);
	useEffect(() => {
		const storedSupplierId = localStorage.getItem('supplierId');
		if (storedSupplierId) {
			setSupplierId(storedSupplierId);
		}
	}, []);
	useEffect(() => {
		const getIncome = async () => {
			try {
				const url = supplierId
					? `orders/income?sid=${supplierId}`
					: 'orders/income';
				const res = await userRequest.get(url);
				res.data.sort((a, b) => a._id - b._id);
				setIncome(res.data.slice(-2));
				setPerc((res.data[1].total * 100) / res.data[0].total - 100);
				setPercOrgin(
					(res.data[1].totalOrgin * 100) / res.data[0].totalOrgin - 100,
				);
				setRevSetPerc(res.data[1].total - res.data[1].totalOrgin);
			} catch (error) {
				console.error('Error fetching income data:', error);
			}
		};
		if (supplierId) {
			getIncome();
		}
	}, [supplierId]);
	return (
		<div className='featured'>
			<div className='featuredItem'>
				<span className='featuredTitle'>Revanue</span>
				<div className='featuredMoneyContainer'>
					<span className='featuredMoney'>
						{income.length === 0 ? (
							<h4>No data</h4>
						) : income.length === 1 ? (
							<> ${income[0]?.total - income[0]?.totalOrgin}</>
						) : (
							<> ${income[1]?.total - income[1]?.totalOrgin}</>
						)}
					</span>
					<span className='featuredMoneyRate'>
						%{Math.floor(perc - percOrgin)}{' '}
						{perc - percOrgin < 0 ? (
							<ArrowDownward className='featuredIcon negative' />
						) : (
							<ArrowUpward className='featuredIcon' />
						)}
					</span>
				</div>
				<span className='featuredSub'>Compared to last month</span>
			</div>
			<div className='featuredItem'>
				<span className='featuredTitle'>Sales</span>
				<div className='featuredMoneyContainer'>
					<span className='featuredMoney'>
						{income.length === 0 ? (
							<h4>No data</h4>
						) : income.length === 1 ? (
							<> ${income[0]?.total} </>
						) : (
							<> ${income[1]?.total} </>
						)}
					</span>
					<span className='featuredMoneyRate'>
						%{Math.floor(perc)}{' '}
						{perc < 0 ? (
							<ArrowDownward className='featuredIcon negative' />
						) : (
							<ArrowUpward className='featuredIcon' />
						)}
					</span>
				</div>
				<span className='featuredSub'>Compared to last month</span>
			</div>
			<div className='featuredItem'>
				<span className='featuredTitle'>Cost</span>
				<div className='featuredMoneyContainer'>
					<span className='featuredMoney'>
						{income.length === 0 ? (
							<h4>No data</h4>
						) : income.length === 1 ? (
							<> ${income[0]?.totalOrgin} </>
						) : (
							<> ${income[1]?.totalOrgin} </>
						)}
					</span>
					<span className='featuredMoneyRate'>
						%{Math.floor(percOrgin)}{' '}
						{percOrgin < 0 ? (
							<ArrowDownward className='featuredIcon negative' />
						) : (
							<ArrowUpward className='featuredIcon' />
						)}
					</span>
				</div>
				<span className='featuredSub'>Compared to last month</span>
			</div>
		</div>
	);
}
