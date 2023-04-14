import { useState } from "react";
import "./createoffer.css";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addOffer } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
export default function CreateOffer() {
	const [inputs, setInputs] = useState({});
	let [file, setFile] = useState(null);
	const [cat, setCat] = useState([]);
	const [size, setSize] = useState([]);
	const [color1, setColor1] = useState([]);
	const [color2, setColor2] = useState([]);
	const [color3, setColor3] = useState([]);
	const [color4, setColor4] = useState([]);
	const [color5, setColor5] = useState([]);
	const [color6, setColor6] = useState([]);
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const handleCat = (e) => {
		setCat(e.target.value.split(","));
	};
	const addSize = (e) => {
		setSize((prev) => {
			return [...prev, e.target.value];
		});
	};
	let colorPicker1,
		colorPicker2,
		colorPicker3,
		colorPicker4,
		colorPicker5,
		colorPicker6;
	const defaultColor = "#FFFFFF";
	window.addEventListener("load", startup, true);
	function startup() {
		colorPicker1 = document.getElementById("color-picker1");
		colorPicker1.addEventListener("input", update1);
		colorPicker2 = document.getElementById("color-picker2");
		colorPicker2.addEventListener("input", update2);
		colorPicker3 = document.getElementById("color-picker3");
		colorPicker3.addEventListener("input", update3);
		colorPicker4 = document.getElementById("color-picker4");
		colorPicker4.addEventListener("input", update4);
		colorPicker5 = document.getElementById("color-picker5");
		colorPicker5.addEventListener("input", update5);
		colorPicker6 = document.getElementById("color-picker6");
		colorPicker6.addEventListener("input", update6);
		colorPicker1.value = defaultColor;
		colorPicker2.value = defaultColor;
		colorPicker3.value = defaultColor;
		colorPicker4.value = defaultColor;
		colorPicker5.value = defaultColor;
		colorPicker6.value = defaultColor;
	}
	function update1() {
		const color = colorPicker1.value;
		setColor1(() => {
			return [color];
		});
	}
	function update2() {
		const color = colorPicker2.value;
		setColor2(() => {
			return [color];
		});
	}
	function update3() {
		const color = colorPicker3.value;
		setColor3(() => {
			return [color];
		});
	}
	function update4() {
		const color = colorPicker4.value;
		setColor4(() => {
			return [color];
		});
	}
	function update5() {
		const color = colorPicker5.value;
		setColor5(() => {
			return [color];
		});
	}
	function update6() {
		const color = colorPicker6.value;
		setColor6(() => {
			return [color];
		});
	}
	const clearColor = (e) => {
		e.preventDefault();
		setColor1([]);
		setColor2([]);
		setColor3([]);
		setColor4([]);
		setColor5([]);
		setColor6([]);
		colorPicker1 = document.getElementById("color-picker1");
		colorPicker2 = document.getElementById("color-picker2");
		colorPicker3 = document.getElementById("color-picker3");
		colorPicker4 = document.getElementById("color-picker4");
		colorPicker5 = document.getElementById("color-picker5");
		colorPicker6 = document.getElementById("color-picker6");
		colorPicker1.value = defaultColor;
		colorPicker2.value = defaultColor;
		colorPicker3.value = defaultColor;
		colorPicker4.value = defaultColor;
		colorPicker5.value = defaultColor;
		colorPicker6.value = defaultColor;
	};
	const handleClick = (e) => {
		e.preventDefault();
		if (file === null) {
			swal("Error", "Please select an image", "info");
			return;
		}
		if (cat.length === 0) {
			swal("Error", "Please select at least one category", "info");
			return;
		}
		if (size.length === 0) {
			swal("Error", "Please select at least one size", "info");
			return;
		}
		let fileName = new Date().getTime() + file.name;
		const storage = getStorage(app);
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
				}
			},
			(error) => {
				swal("Error", error.message, "error");
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const color = [color1, color2, color3, color4, color5, color6];
					const colors = color.filter((item) => {
						return item.length !== 0;
					});
					const offer = {
						...inputs,
						img: downloadURL,
						categories: cat,
						size: size,
						color: colors,
					};
					addOffer(offer, dispatch);
					swal({
						title: "Success",
						text: "Offer added successfully",
						icon: "success",
						button: "Ok",
						closeOnClickOutside: false,
						closeOnEsc: false,
					}).then(() => {
						setInputs({
							title: "",
							desc: "",
							price: "",
							originalPrice: "",
							img: "",
							categories: [],
							size: [],
							color: [],
							quantity: "",
							width: "",
							height: "",
							length: "",
							weight: "",
						});
						fileName = null;
						document.querySelector("#file").value = null;
						setFile(null);
						file = null;
						setCat([]);
						setSize([]);
						setColor1([]);
						setColor2([]);
						setColor3([]);
						setColor4([]);
						setColor5([]);
						setColor6([]);
						colorPicker1 = document.getElementById("color-picker1");
						colorPicker2 = document.getElementById("color-picker2");
						colorPicker3 = document.getElementById("color-picker3");
						colorPicker4 = document.getElementById("color-picker4");
						colorPicker5 = document.getElementById("color-picker5");
						colorPicker6 = document.getElementById("color-picker6");
						colorPicker1.value = defaultColor;
						colorPicker2.value = defaultColor;
						colorPicker3.value = defaultColor;
						colorPicker4.value = defaultColor;
						colorPicker5.value = defaultColor;
						colorPicker6.value = defaultColor;
						document.querySelector(".Title").value = "";
						document.querySelector(".Description").value = "";
						document.querySelector(".Price").value = "";
						document.querySelector(".OriginalPrice").value = "";
						document.querySelector(".Categories").value = "";
						document.querySelector(".Quantity").value = "";
						document.querySelector(".Width").value = "";
						document.querySelector(".Height").value = "";
						document.querySelector(".Length").value = "";
						document.querySelector(".Weight").value = "";
						document.querySelector(".expirationDate").value = "";
						for (const checkbox of document.querySelectorAll(".Size")) {
							checkbox.checked = true;
							checkbox.checked = false;
						}
					});
				});
			},
		);
	};
	return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Offer</h1>
      <form className="addProductForm">
        <div className="divition1">
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              name="title"
              className="Title"
              type="text"
              placeholder="Apple Airpods"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              name="desc"
              className="Description"
              type="text"
              placeholder="description..."
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <fieldset>
              <legend>Size</legend>
              <input
                type="checkbox"
                className="Size"
                name="size"
                onClick={addSize}
                value="S"
              />
              <label> S</label>
              <br />
              <input
                type="checkbox"
                className="Size"
                name="size"
                onClick={addSize}
                value="M"
              />
              <label> M</label>
              <br />
              <input
                type="checkbox"
                className="Size"
                name="size"
                onClick={addSize}
                value="L"
              />
              <label> L</label>
              <br />
              <input
                type="checkbox"
                className="Size"
                name="size"
                onClick={addSize}
                value="XL"
              />
              <label> XL</label>
              <br />
              <input
                type="checkbox"
                name="size"
                onClick={addSize}
                value="XXL"
                className="Size"
              />
              <label> XXL</label>
              <br />
            </fieldset>
          </div>
          <div className="addProductItem color">
            <label>Color</label>
            <br />
            <input id="color-picker1" name="color1" type="color" />
            <input id="color-picker2" name="color1" type="color" />
            <input id="color-picker3" name="color1" type="color" />
            <input id="color-picker4" name="color1" type="color" />
            <input id="color-picker5" name="color1" type="color" />
            <input id="color-picker6" name="color1" type="color" />
          </div>
          <div className="addProductItem">
            <button onClick={clearColor}>Clear All Colors</button>
          </div>
        </div>
        <div className="divition2">
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleChange}
              className="Price"
            />
          </div>
          <div className="addProductItem">
            <label>Original Price</label>
            <input
              name="originalPrice"
              type="number"
              placeholder="100"
              onChange={handleChange}
              className="OriginalPrice"
            />
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <select
              name="categories"
              onChange={handleCat}
              className="Categories"
            >
              <option value="">Select Categories</option>
              <option value="offer">offer</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="1"
              onChange={handleChange}
              className="Quantity"
            />
          </div>
        </div>
        <div className="divition3">
          <div className="addProductItem">
            <label>Offer Width</label>
            <input
              name="width"
              type="number"
              placeholder="200"
              onChange={handleChange}
              className="Width"
            />
          </div>
          <div className="addProductItem">
            <label>Offer Height</label>
            <input
              name="height"
              type="number"
              placeholder="200"
              onChange={handleChange}
              className="Height"
            />
          </div>
          <div className="addProductItem">
            <label>Offer Length</label>
            <input
              name="length"
              type="number"
              placeholder="200"
              onChange={handleChange}
              className="Length"
            />
          </div>
          <div className="addProductItem">
            <label>Offer Weight</label>
            <input
              name="weight"
              type="number"
              placeholder="200"
              onChange={handleChange}
              className="Weight"
            />
          </div>
          <div className="addProductItem">
            <label>Offer Expiration Date</label>
            <input
              name="timeLeft"
              type="date"
              onChange={handleChange}
              className="expirationDate"
            />
          </div>
          <button onClick={handleClick} className="addProductButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
