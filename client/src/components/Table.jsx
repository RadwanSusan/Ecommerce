import './table.css';
const Table = ({ data }) => {
	return (
		<table className='table1'>
			<tbody>
				{data.map((item) => (
					<tr key={item.id}>
						<a href={`/product/${item._id}`}>
							<td>{item.title}</td>
						</a>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default Table;
