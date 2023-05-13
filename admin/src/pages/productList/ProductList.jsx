import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import swal from 'sweetalert';
import { CSVLink } from 'react-csv';
import { ExcelRenderer } from 'react-excel-renderer';

export default function ProductList() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch]);

	const [excelData, setExcelData] = useState([]);

	const handleExcelUpload = (event) => {
		const file = event.target.files[0];

		ExcelRenderer(file, (err, resp) => {
			if (err) {
				console.log(err);
			} else {
				setExcelData(resp.rows);

				console.log(
					`🚀  file: ProductList.jsx:20  excelData =>`,
					excelData,
				);
				console.log(
					`🚀  file: ProductList.jsx:34  resp.rows =>`,
					resp.rows,
				);
				// Update products with the new data from Excel
				// This assumes the Excel data has the same structure as the existing products
				dispatch({ type: 'UPDATE_PRODUCTS', payload: resp.rows });
			}
		});
	};
	const handleDelete = (id) => {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this product!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					deleteProduct(id, dispatch);
				}
			})
			.catch((err) => {
				swal('Error', err.message, 'error');
			});
	};
	const columns = [
		{ field: '_id', headerName: 'ID', width: 220 },
		{
			field: 'product',
			headerName: 'Product',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='productListItem'>
						<img
							className='productListImg'
							src={params.row.img}
							alt=''
						/>
						{params.row.title}
					</div>
				);
			},
		},
		{ field: 'inStock', headerName: 'Stock', width: 200 },
		{
			field: 'price',
			headerName: 'Price',
			width: 160,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={'/product/' + params.row._id}>
							<button className='productListEdit'>View & Edit</button>
						</Link>
						<DeleteOutline
							className='productListDelete'
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];
	const newObj = products.map((row) => ({ ...row }));
	newObj.map((row) => {
		if (row.quantity === 0) {
			row.inStock = false;
		}
		return row;
	});

	return (
		<div className='productList'>
			<div className='middle-product-create'>
				<h2 className='productAddButton1'>Create Product : </h2>
				<Link to='/newproduct'>
					<button className='productAddButton'>Create</button>
				</Link>
				<CSVLink
					className='productAddButton'
					style={{ textDecoration: 'none', width: '100px' }}
					data={newObj}
					filename='products-data.csv'
				>
					Export to Excel
				</CSVLink>
				<input
					type='file'
					accept='.xlsx'
					onChange={handleExcelUpload}
					style={{ marginLeft: '20px' }}
				/>
			</div>
			<DataGrid
				rows={newObj}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row._id}
				pageSize={13}
				autoHeight
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
}
