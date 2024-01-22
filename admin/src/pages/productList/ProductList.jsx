import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getProducts,
	addAllProduct2,
} from '../../redux/apiCalls';
import swal from 'sweetalert';
import { CSVLink } from 'react-csv';
import { ExcelRenderer } from 'react-excel-renderer';
import myFile from '../../Assets/ZAID2.csv';
export default function ProductList() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	const filteredProducts = products.filter((product) => product._id);
	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch]);
	const handleExcelUpload = async (event) => {
		const file = event.target.files[0];
		ExcelRenderer(file, async (err, resp) => {
			if (err) {
				console.error(err);
			} else {
				const mergedProducts = mergeProducts(resp.rows);
				await addAllProduct2(mergedProducts, dispatch);
				getProducts(dispatch);
			}
		});
	};
	const mergeProducts = (rows) => {
		const productsMap = {};
		rows.forEach((row, index) => {
			if (index === 0) return;
			const product = rowToProduct(row);
			if (!productsMap[product._id]) {
				productsMap[product._id] = { ...product, variants: [] };
			}
			productsMap[product._id].variants.push({
				color: product.color,
				size: product.size,
				quantity: product.quantity,
				img: product.img,
				_id: product.variant_id,
			});
		});
		return Object.values(productsMap).map((product) => {
			delete product.color;
			delete product.size;
			delete product.quantity;
			delete product.img;
			delete product.variant_id;
			return product;
		});
	};
	const rowToProduct = (row) => {
		return {
			_id: row[0],
			title: row[1],
			title_ar: row[2],
			desc: row[3],
			desc_ar: row[4],
			img: [row[5]],
			categories: [row[6]],
			size: [row[7]],
			color: [row[8]],
			price: row[9],
			originalPrice: row[10],
			inStock: row[11],
			quantity: row[12],
			width: row[13],
			height: row[14],
			length: row[15],
			weight: row[16],
			promo: {
				code: row[17],
				startDate: row[18],
				endDate: row[19],
			},
			discount: {
				startDate: row[20],
				endDate: row[21],
				amount: row[22],
			},
			variant_id: row[23],
		};
	};
	const handleDelete = (id) => {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this product!',
			icon: 'warning',
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
			renderCell: (params) => (
				<div className='productListItem'>
					<img
						className='productListImg'
						src={params.row.img}
						alt=''
					/>
					{params.row.title}
				</div>
			),
		},
		{ field: 'inStock', headerName: 'Stock', width: 200 },
		{ field: 'price', headerName: 'Price', width: 160 },
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => (
				<>
					<Link to={`/product/${params.row._id}`}>
						<button className='productListEdit'>View & Edit</button>
					</Link>
					<DeleteOutline
						className='productListDelete'
						onClick={() => handleDelete(params.row._id)}
					/>
				</>
			),
		},
	];
	const getCsvData = () => {
		if (!Array.isArray(products)) {
			return [];
		}
		return products.flatMap((product) => {
			if (!Array.isArray(product.variants)) {
				return [];
			}
			return product.variants.map((variant) => ({
				_id: product._id || '',
				title: product.title || '',
				title_ar: product.title_ar || '',
				desc: product.desc || '',
				desc_ar: product.desc_ar || '',
				img: variant.img ? variant.img.join(';') : '',
				categories: product.categories ? product.categories.join(';') : '',
				size: variant.size ? variant.size.join(',') : '',
				color: variant.color ? variant.color.join(',') : '',
				price: product.price,
				originalPrice: product.originalPrice,
				inStock: product.inStock !== undefined ? product.inStock : '',
				quantity: variant.quantity,
				width: product.width,
				height: product.height,
				length: product.length,
				weight: product.weight,
				promo_code:
					product.promo && product.promo.code ? product.promo.code : '',
				promo_startDate:
					product.promo &&
					product.promo.startDate &&
					product.promo.startDate &&
					product.promo.startDate
						? new Date(parseInt(product.promo.startDate)).toISOString()
						: '',
				promo_endDate:
					product.promo &&
					product.promo.endDate &&
					product.promo.endDate &&
					product.promo.endDate
						? new Date(parseInt(product.promo.endDate)).toISOString()
						: '',
				discount_startDate:
					product.discount &&
					product.discount.startDate &&
					product.discount.startDate &&
					product.discount.startDate
						? new Date(parseInt(product.discount.startDate)).toISOString()
						: '',
				discount_endDate:
					product.discount &&
					product.discount.endDate &&
					product.discount.endDate &&
					product.discount.endDate
						? new Date(parseInt(product.discount.endDate)).toISOString()
						: '',
				discount_amount:
					product.discount &&
					product.discount.discount &&
					product.discount.discount
						? product.discount.discount
						: '',
			}));
		});
	};
	const dataGridRows = filteredProducts.map((product) => ({
		id: product._id,
		...product,
	}));
	return (
		<div className='productList'>
			<div className='middle-product-create'>
				<h2 className='productAddButton1'>Create Product:</h2>
				<Link to='/newproduct'>
					<button className='productAddButton'>Create</button>
				</Link>
				<CSVLink
					className='productAddButton'
					style={{ textDecoration: 'none', width: '100px' }}
					data={getCsvData()}
					filename='products.csv'>
					Export to CSV
				</CSVLink>
				<input
					className='productAddButton22'
					type='file'
					onChange={handleExcelUpload}
					style={{ marginLeft: '20px' }}
				/>
				<a
					className='productAddButton22'
					href={myFile}
					download='my-excel.csv'
					target='_blank'
					rel='noopener noreferrer'>
					<button>Download CSV</button>
				</a>
			</div>
			<DataGrid
				rows={dataGridRows}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row.id}
				pageSize={13}
				autoHeight
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
}
