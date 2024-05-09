import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useEffect, useState, useCallback } from 'react';
import { userRequest } from '../../requestMethods';

function getStoredSupplierId() {
	const storedSupplierId = localStorage.getItem('supplierId');
	return storedSupplierId;
}

export default function FeaturedInfo() {
	const [income, setIncome] = useState([]);
	const [perc, setPerc] = useState(0);
	const [percOrgin, setPercOrgin] = useState(0);
	const [revPerc, setRevSetPerc] = useState(0);
	const [supplierId, setSupplierId] = useState(getStoredSupplierId() || null);

	console.log('Retrieved supplierId:', supplierId);

	const getIncome = useCallback(async () => {
		if (!supplierId) return;

		try {
			console.log(supplierId);
			const url = supplierId
				? `orders/income?sid=${supplierId}`
				: `orders/income?sid=${supplierId}`;
			const res = await userRequest.get(url);
			console.log('Income Data:', res.data);

			if (res.data.length >= 2) {
				res.data.sort((a, b) => a._id - b._id);
				setIncome(res.data.slice(-2));
				setPerc((res.data[1].total * 100) / res.data[0].total - 100);
				setPercOrgin(
					res.data[0].totalOrigin !== 0
						? (res.data[1].totalOrigin * 100) / res.data[0].totalOrigin -
								100
						: 0,
				);
				setPerc(res.data[1].total - res.data[1].totalOrigin);
			} else {
				setIncome([]);
				setPerc(0);
				setPercOrgin(0);
				setPerc(0);
			}
		} catch (error) {
			console.error('Error fetching income data:', error);
			setIncome([]);
			setPerc(0);
			setPercOrgin(0);
			setPerc(0);
		}
	}, [supplierId]);

	useEffect(() => {
		getIncome();
	}, [getIncome]);

	console.log('perc:', perc);
	console.log('percOrgin:', percOrgin);

	return (
		<div className='featured'>
			<div className='featuredItem'>
				<span className='featuredTitle'>Revanue</span>
				<div className='featuredMoneyContainer'>
					<span className='featuredMoney'>
						{income.length === 0 ? (
							<h4>No data</h4>
						) : income.length === 1 ? (
							<>
								{' '}
								$
								{(income[0]?.total - income[0]?.totalOrigin).toFixed(2)}
							</>
						) : (
							<>
								{' '}
								$
								{(income[1]?.total - income[1]?.totalOrigin).toFixed(2)}
							</>
						)}
					</span>
					<span className='featuredMoneyRate'>
						%{Math.floor(perc - percOrgin) / 100}{' '}
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
							<> ${(income[0]?.total).toFixed(2)} </>
						) : (
							<> ${(income[1]?.total).toFixed(2)} </>
						)}
					</span>
					<span className='featuredMoneyRate'>
						%{Math.floor(perc) / 100}{' '}
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
							<> ${(income[0]?.totalOrigin).toFixed(2)} </>
						) : (
							<> ${(income[1]?.totalOrigin).toFixed(2)} </>
						)}
					</span>
					<span className='featuredMoneyRate'>
						%{Math.floor(percOrgin) / 100}{' '}
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
