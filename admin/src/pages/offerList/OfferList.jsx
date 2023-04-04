import "./offerList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { offerRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffer, deleteOffer } from "../../redux/apiCalls";
import swal from "sweetalert";

export default function Offer() {
	const [data, setData] = useState(offerRows);
	const dispatch = useDispatch();
	const offer = useSelector((state) => state.offer.offer);

	useEffect(() => {
		getOffer(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this offer!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteOffer(id, dispatch);
			}
		});
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 200 },
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
		{ field: "inStock", headerName: "Stock", width: 150 },
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
						<Link to={"/offer/" + params.row._id}>
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
				rows={offer}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row._id}
				pageSize={8}
				autoHeight
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
}
