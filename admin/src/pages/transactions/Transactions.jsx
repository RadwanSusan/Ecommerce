import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './transactions.css';
import { format } from 'timeago.js';
import swal from 'sweetalert';
import { CSVLink } from 'react-csv';

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

    const array11 = [];
    const array12 = [];

    const productsAll4 = order.products.map((p) => {
      array11.push(p._id);
      array12.push(p.quantity);

    });
    swal({
      icon: 'info',
      title: 'Order Details',
      text: `User Id: ${order.userId}
      Product Id: ${array11.join(' - ')}

      Status: ${order.status}
      Price: ${order.amount}
      Original Price: ${order.amountOrgin}
      Quantity: ${array12.join(' -')}



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
      <div className='radwan'>
        <h3 className='widgetLgTitle'>transactions</h3>
        <CSVLink
          className='productAddButton'
          style={{ textDecoration: 'none', width: '100px' }}
          data={orders}
          filename='products-data.csv'
        >
          Export to Excel
        </CSVLink>
      </div>
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
          <tr className='widgetLgTr' key={order._id}>
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
