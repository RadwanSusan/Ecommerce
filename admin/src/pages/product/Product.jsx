import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/apiCalls';
import swal from 'sweetalert';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [pStats, setPStats] = useState([]);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
	);
	console.log(product);
  const [productUpdateData, setProductUpdateData] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    inStock: product.inStock,
    img: product.img,
    categories: product.categories,
    size: product.size,
    color: product.color,
    height: product.height,
    width: product.width,
    quantity: product.quantity,
    weight: product.weight,
    length: product.length,
  });
  const handleUpdate = (e) => {
    setProductUpdateData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileName;
    if (file !== null) {
      fileName = file.name;
    }
    if (file === null) {
      if (
        document.querySelector('.PTitle').value == '' &&
        document.querySelector('.PWeight').value == '' &&
        document.querySelector('.PHeight').value == '' &&
        document.querySelector('.PWidth').value == '' &&
        document.querySelector('.PQuantity').value == '' &&
        document.querySelector('.PLenght').value == '' &&
        document.querySelector('.PDesc').value == '' &&
        document.querySelector('.PPrice').value == ''
      ) {
        swal('Info', 'Please update atleast one feild!', 'info');
        return;
      }
      if (
        productUpdateData.title === '' ||
        productUpdateData.desc === '' ||
        productUpdateData.price === '' ||
        productUpdateData.inStock === ''
      ) {
        swal('Info', 'Please make an update in one of the feilds!', 'info');
        return;
      }
      fileName = product.img;
    
		try {
			
        const product = { ...productUpdateData };
        updateProduct(productId, product, dispatch);
        swal('Product Updated', '', 'success');
      } catch (err) {
        swal('Error', err.message, 'error');
      }
	}
	else {
      fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          swal('Error', error.message, 'error');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            try {
              const product = { ...productUpdateData, img: downloadURL };
              updateProduct(productId, product, dispatch);
              swal('Product Updated', '', 'success');
            } catch (err) {
              swal('Error', err.message, 'error');
            }
          });
        }
      );
    }
  };
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('orders/income?pid=' + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        swal('Error', err.message, 'error');
      }
    };
    getStats();
  }, [productId, MONTHS]);
	console.log(product);
  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart data={pStats} dataKey='Sales' title='Sales Performance' />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product.img} alt='' className='productInfoImg' />
            <span className='productName'>{product.title}</span>
          </div>
          <div className='productInfoBottom productInfoBottom2 '>
            <div className='diviti'>
              <div className='productInfoItem'>
                <span className='productInfoKey'>Product name:</span>
                <span className='productInfoValue'>{product._id}</span>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>Product description:</span>
                <span className='productInfoValue'>{product.desc}</span>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>sales:</span>
                <span className='productInfoValue'>0</span>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>in stock:</span>
                <span className='productInfoValue'>
                  {product.inStock.toString()}
                </span>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>price:</span>
                <span className='productInfoValue'>{product.price}</span>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>color:</span>
                <ul className='productInfoValue'>
                  {product.color.map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className='diviti2'>
              <div className='productInfoItem'>
                <span className='productInfoKey'>size:</span>
                <ul className='productInfoValue'>
                  {product.size.map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ul>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>Quantity:</span>
                <div className='productInfoValue'>{product.quantity}</div>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>Width:</span>
                <div className='productInfoValue'>{product.width}</div>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>Height:</span>
                <div className='productInfoValue'>{product.height}</div>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>Length:</span>
                <div className='productInfoValue'>{product.length}</div>
              </div>
              <div className='productInfoItem'>
                <span className='productInfoKey'>Weight:</span>
                <div className='productInfoValue'>{product.weight}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input
              type='text'
              className='PTitle'
              name='title'
              placeholder={product.title}
              onChange={handleUpdate}
            />
            <label>Product Description</label>
            <input
              type='text'
              name='desc'
              className='PDesc'
              placeholder={product.desc}
              onChange={handleUpdate}
            />
            <label>Price</label>
            <input
              type='text'
              name='price'
              className='PPrice'
              placeholder={product.price}
              onChange={handleUpdate}
            />
            <label>In Stock</label>
            <select
              name='inStock'
              className='PStock'
              id='idStock'
              onChange={handleUpdate}
            >
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
            <label>Quantity</label>
            <input
              type='text'
              className='PQuantity'
              name='quantity'
              placeholder={product.quantity}
              onChange={handleUpdate}
            />
          </div>
          <div className='productFormLeft'>
            <label>Width</label>
            <input
              type='text'
              className='PWidth'
              name='width'
              placeholder={product.width}
              onChange={handleUpdate}
            />
            <label>Height</label>
            <input
              type='text'
              className='PHeight'
              name='height'
              placeholder={product.height}
              onChange={handleUpdate}
            />
            <label>Lenght</label>
            <input
              type='text'
              className='PLength'
              name='length'
              placeholder={product.length}
              onChange={handleUpdate}
            />
            <label>Weight</label>
            <input
              type='text'
              className='PWeight'
              name='weight'
              placeholder={product.weight}
              onChange={handleUpdate}
            />
          </div>

          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={product.img} alt='' className='productUploadImg' />
              <label for='file'>
                <Publish />
              </label>
              <input
                type='file'
                id='file'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className='productButton' onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
