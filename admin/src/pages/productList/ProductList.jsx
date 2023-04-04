import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import swal from "sweetalert";

export default function ProductList() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);

	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this product!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					deleteProduct(id, dispatch);
				}
			})
			.catch((err) => {
				swal("Error", err.message, "error");
			});
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 220 },
		{
			field: "product",
			headerName: "Product",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						<img className="productListImg" src={params.row.img} alt="" />
						{params.row.title}
					</div>
				);
			},
		},
		{ field: "inStock", headerName: "Stock", width: 200 },
		{
			field: "price",
			headerName: "Price",
			width: 160,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/product/" + params.row._id}>
							<button className="productListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="productListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="productList">
			<DataGrid
				rows={products}
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
