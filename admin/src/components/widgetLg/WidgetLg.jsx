import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './widgetLg.css';
import { format } from 'timeago.js';

function getStoredSupplierId() {
	const storedSupplierId = localStorage.getItem('supplierId');
	return storedSupplierId;
}

export default function WidgetLg() {
	const [orders, setOrders] = useState([]);
	const [supplierId, setSupplierId] = useState(getStoredSupplierId() || null);

	useEffect(() => {
		const getOrders = async () => {
			try {
				if (supplierId) {
					const res = await userRequest.get(`orders/find/${supplierId}`);
					setOrders(res.data);
				}
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		};

		getOrders();
	}, [supplierId]);

	const Button = ({ type }) => {
		return <button className={'widgetLgButton ' + type}>{type}</button>;
	};

	return (
		<div className='widgetLg'>
			<h3 className='widgetLgTitle'>Latest transactions</h3>
			{orders.length === 0 ? (
				<p>No transactions available.</p>
			) : (
				<table className='widgetLgTable'>
					<tr className='widgetLgTr'>
						<th className='widgetLgTh'>Customer</th>
						<th className='widgetLgTh'>Date</th>
						<th className='widgetLgTh'>Amount</th>
						<th className='widgetLgTh'>Status</th>
					</tr>
					{orders
						.map((order) => (
							<tr
								className='widgetLgTr'
								key={order._id}>
								<td className='widgetLgUser'>
									<span className='widgetLgName'>{order.userId}</span>
								</td>
								<td className='widgetLgDate'>
									{format(order.createdAt)}
								</td>
								<td className='widgetLgAmount'>${order.amount}</td>
								<td className='widgetLgStatus'>
									<Button type={order.status} />
								</td>
							</tr>
						))
						.slice(-5)}
				</table>
			)}
		</div>
	);
}
