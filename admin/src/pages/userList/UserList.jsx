import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../../redux/apiCalls";
import swal from "sweetalert";
export default function UserList() {
	const dispatch = useDispatch();
	useEffect(() => {
		getUser(dispatch);
	}, [dispatch]);
	const user2 = useSelector((state) => state.userAll.usersAll);
	const handleDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this user!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteUser(id, dispatch);
			}
		});
	};
	const columns = [
		{ field: "_id", headerName: "ID", width: 200 },
		{
			field: "user",
			headerName: "User",
			width: 200,
			renderCell: (params) => {
				// if (params.row.img === null) {
				// 	params.row.img = "https://i.ibb.co/n7nxz8y/user.png";
				// }
				return (
					<div className="userListUser">
						<img className="userListImg" src={params.row.img} alt="" />
						{params.row.username}
					</div>
				);
			},
		},
		{ field: "email", headerName: "Email", width: 200 },
		{
			field: "isAdmin",
			headerName: "Admin",
			width: 120,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/user/" + params.row._id}>
							<button className="userListEdit">View & Edit</button>
						</Link>
						<DeleteOutline
							className="userListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];
	return (
		<div className="userList">
			<div className="middle-product-create">
				<h2 className="productAddButton1">Create User : </h2>
				<Link to="/newUser">
					<button className="productAddButton">Create</button>
				</Link>
			</div>
			<DataGrid
				rows={user2}
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
