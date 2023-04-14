import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './transactions.css';
import { format } from 'timeago.js';
import swal from 'sweetalert';

export default function Transactions() {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const getOrders = async () => {
			try {
				const res = await userRequest.get('orders');
				setOrders(res.data);
			} catch {}
		};
		getOrders();
	}, []);

	const showMore = (id) => {
		let order = orders.find((order) => order._id === id);
		swal({
			icon: 'info',
			title: 'Order Details',
			text: `User Id: ${order.userId}
      Product Id: ${order.products[0].productId}
      Status: ${order.status}
      Price: ${order.amount}
      Original Price: ${order.amountOrgin}
      Quantity: ${order.products[0].quantity}
      

      Status: ${order.status}
      Date: ${format(order.createdAt)}
      `,
		});
	};
	const Button = ({ type }) => {
		return <button className={'widgetLgButton ' + type}>{type}</button>;
	};
	return (
		<div className='widgetLg'>
			<h3 className='widgetLgTitle'>transactions</h3>
			<table className='widgetLgTable'>
				<tr className='widgetLgTr'>
					<th className='widgetLgTh'>Customer</th>
					<th className='widgetLgTh'>Date</th>
					<th className='widgetLgTh'>Amount</th>
					<th className='widgetLgTh'>Address</th>
					<th className='widgetLgTh'>Status</th>
					<th className='widgetLgTh'>View</th>
				</tr>
				{orders.map((order) => (
					<tr
						className='widgetLgTr'
						key={order._id}
					>
						<td className='widgetLgUser'>
							<span className='widgetLgName'>{order.userId}</span>
						</td>
						<td className='widgetLgDate'>{format(order.createdAt)}</td>
						<td className='widgetLgAmount'>${order.amount}</td>
						<td className='widgetLgAmount'>usa</td>
						<td className='widgetLgStatus'>
							<Button type={order.status} />
						</td>
						<td className='widgetLgAmount'>
							<button
								className='viewOrder'
								order_id={order._id}
								onClick={() => showMore(order._id)}
							>
								view
							</button>
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
