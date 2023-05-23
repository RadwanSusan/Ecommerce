import './offerList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOffer, deleteOffer } from '../../redux/apiCalls';
import { CSVLink } from 'react-csv';
import { ExcelRenderer } from 'react-excel-renderer';
import { addAllOffer } from '../../redux/apiCalls';

import swal from 'sweetalert';

export default function Offer() {
	const dispatch = useDispatch();
	const offer = useSelector((state) => state.offer.offer);
	useEffect(() => {
		getOffer(dispatch);
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
				// dispatch({ type: 'UPDATE_PRODUCTS', payload: resp.rows });
				addAllOffer(resp.rows);
			}
		});
	};
	const handleDelete = (id) => {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this offer!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteOffer(id, dispatch);
			}
		});
	};
	const columns = [
		{ field: '_id', headerName: 'ID', width: 200 },
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
		{ field: 'inStock', headerName: 'Stock', width: 150 },
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
						<Link to={'/offer/' + params.row._id}>
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
	const newObj = offer.map((row) => ({ ...row }));
	newObj.map((row) => {
		if (row.quantity === 0) {
			row.inStock = false;
		}
		return row;
	});
	console.log(`🚀  file: OfferList.jsx:85  newObj =>`, newObj);

	return (
    <div className='productList'>
      <div className='middle-product-create'>
        <h2 className='productAddButton1'>Create Offer : </h2>
        <Link to='/createOffer'>
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
					className='productAddButton22'
					type='file'
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
