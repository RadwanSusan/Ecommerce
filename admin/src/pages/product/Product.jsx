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
    const [size, setSize] = useState([...product.size]);
  const colorArrayUpdate = [];
	const sizeArrayUpdate = [];
  
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
        document.querySelector('.PLength').value == '' &&
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
      if (document.querySelector('.color-picker1.haveColor')) {
        colorArrayUpdate.push(document.querySelector('.color-picker1').value);
      }
      if (document.querySelector('.color-picker2.haveColor')) {
        colorArrayUpdate.push(document.querySelector('.color-picker2').value);
      }
      if (document.querySelector('.color-picker3.haveColor')) {
        colorArrayUpdate.push(document.querySelector('.color-picker3').value);
      }
      if (document.querySelector('.color-picker4.haveColor')) {
        colorArrayUpdate.push(document.querySelector('.color-picker4').value);
      }
      if (document.querySelector('.color-picker5.haveColor')) {
        colorArrayUpdate.push(document.querySelector('.color-picker5').value);
      }
      if (document.querySelector('.color-picker6.haveColor')) {
        colorArrayUpdate.push(document.querySelector('.color-picker6').value);
        }
        	if (document.querySelector('.SizeS.haveSize')) {
            sizeArrayUpdate.push('S');
          }
          if (document.querySelector('.SizeM.haveSize')) {
            sizeArrayUpdate.push('M');
          }
          if (document.querySelector('.SizeL.haveSize')) {
            sizeArrayUpdate.push('L');
          }
          if (document.querySelector('.SizeXL.haveSize')) {
            sizeArrayUpdate.push('XL');
          }
          if (document.querySelector('.SizeXXL.haveSize')) {
            sizeArrayUpdate.push('XXL');
          }
        const color = colorArrayUpdate;
        const size = sizeArrayUpdate;
			
        const product = { ...productUpdateData,size,color };
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
								if (
									document.querySelector(
										'.color-picker1.haveColor',
									)
								) {
									colorArrayUpdate.push(
										document.querySelector('.color-picker1')
											.value,
									);
								}
								if (
									document.querySelector(
										'.color-picker2.haveColor',
									)
								) {
									colorArrayUpdate.push(
										document.querySelector('.color-picker2')
											.value,
									);
								}
								if (
									document.querySelector(
										'.color-picker3.haveColor',
									)
								) {
									colorArrayUpdate.push(
										document.querySelector('.color-picker3')
											.value,
									);
								}
								if (
									document.querySelector(
										'.color-picker4.haveColor',
									)
								) {
									colorArrayUpdate.push(
										document.querySelector('.color-picker4')
											.value,
									);
								}
								if (
									document.querySelector(
										'.color-picker5.haveColor',
									)
								) {
									colorArrayUpdate.push(
										document.querySelector('.color-picker5')
											.value,
									);
								}
								if (
									document.querySelector(
										'.color-picker6.haveColor',
									)
								) {
									colorArrayUpdate.push(
										document.querySelector('.color-picker6')
											.value,
									);
								}
								if (document.querySelector('.SizeS.haveSize')) {
									sizeArrayUpdate.push('S');
								}
								if (document.querySelector('.SizeM.haveSize')) {
									sizeArrayUpdate.push('M');
								}
								if (document.querySelector('.SizeL.haveSize')) {
									sizeArrayUpdate.push('L');
								}
								if (
									document.querySelector('.SizeXL.haveSize')
								) {
									sizeArrayUpdate.push('XL');
								}
								if (
									document.querySelector('.SizeXXL.haveSize')
								) {
									sizeArrayUpdate.push('XXL');
								}
                const color = colorArrayUpdate;
                const size = sizeArrayUpdate;
              
              const product = {
                ...productUpdateData,
                img: downloadURL,
                size,
                color
              };
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
  useEffect(() => {
		product.size.map((item) => {
			if (item === 'S') {
				document.querySelector('.SizeS').checked = true;
				document.querySelector('.SizeS').classList.add('haveSize');
			} else if (item === 'M') {
				document.querySelector('.SizeM').checked = true;
				document.querySelector('.SizeM').classList.add('haveSize');
			} else if (item === 'L') {
				document.querySelector('.SizeL').checked = true;
				document.querySelector('.SizeL').classList.add('haveSize');
			} else if (item === 'XL') {
				document.querySelector('.SizeXL').checked = true;
				document.querySelector('.SizeXL').classList.add('haveSize');
			} else if (item === 'XXL') {
				document.querySelector('.SizeXXL').checked = true;
				document.querySelector('.SizeXXL').classList.add('haveSize');
			}
			return null;
		});
	}, [product.size]);
  useEffect(() => {
    if (product.color[0] !== undefined) {
      document.querySelector('.color-picker1').classList.add('haveColor');
      document.querySelector('.color-picker1').value = product.color[0];
    }
    if (product.color[1] !== undefined) {
      document.querySelector('.color-picker2').classList.add('haveColor');
      document.querySelector('.color-picker2').value = product.color[1];
    }
    if (product.color[2] !== undefined) {
      document.querySelector('.color-picker3').classList.add('haveColor');
      document.querySelector('.color-picker3').value = product.color[2];
    }
    if (product.color[3] !== undefined) {
      document.querySelector('.color-picker4').classList.add('haveColor');
      document.querySelector('.color-picker4').value = product.color[3];
    }
    if (product.color[4] !== undefined) {
      document.querySelector('.color-picker5').classList.add('haveColor');
      document.querySelector('.color-picker5').value = product.color[4];
    }
    if (product.color[5] !== undefined) {
      document.querySelector('.color-picker6').classList.add('haveColor');
      document.querySelector('.color-picker6').value = product.color[5];
    }
    return null;
  }, [product.color]);
  useEffect(() => {
    product.size.map((item) => {
      if (item === 'S') {
        document.querySelector('.SizeS').setAttribute('checked', true);
      } else if (item === 'M') {
        document.querySelector('.SizeM').checked = true;
      } else if (item === 'L') {
        document.querySelector('.SizeL').checked = true;
      } else if (item === 'XL') {
        document.querySelector('.SizeXL').checked = true;
      } else if (item === 'XXL') {
        document.querySelector('.SizeXXL').checked = true;
      }
      return null;
    });
  }, [product.size]);
  const addSize = (e) => {
		if (e.target.classList.contains('haveSize')) {
			e.target.classList.remove('haveSize');
		} else {
			e.target.classList.add('haveSize');
		}
		setSize((prev) => {
			return [...prev, e.target.value];
		});
	};
  const haveColor = (e) => {
    if (e === 'color-picker1') {
      document.querySelector('.color-picker1').classList.add('haveColor');
    }
    if (e === 'color-picker2') {
      document.querySelector('.color-picker2').classList.add('haveColor');
    }
    if (e === 'color-picker3') {
      document.querySelector('.color-picker3').classList.add('haveColor');
    }
    if (e === 'color-picker4') {
      document.querySelector('.color-picker4').classList.add('haveColor');
    }
    if (e === 'color-picker5') {
      document.querySelector('.color-picker5').classList.add('haveColor');
    }
    if (e === 'color-picker6') {
      document.querySelector('.color-picker6').classList.add('haveColor');
    }
  };
  
  
  if (productUpdateData.quantity > 0) {
    productUpdateData.inStock = true;
  } else {
    productUpdateData.inStock = false;
  }
  
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
                <span className='productInfoValue productInfoValue2'>
                  {product.desc}
                </span>
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
            <textarea
              type='text'
              name='desc'
              className='PDesc'
              placeholder={product.desc}
              onChange={handleUpdate}
            />
            <label>Price</label>
            <input
              type='number'
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
              type='number'
              className='PQuantity'
              name='quantity'
              placeholder={product.quantity}
              onChange={handleUpdate}
            />
          </div>
          <div className='productFormLeft'>
            <label>Width</label>
            <input
              type='number'
              className='PWidth'
              name='width'
              placeholder={product.width}
              onChange={handleUpdate}
            />
            <label>Height</label>
            <input
              type='number'
              className='PHeight'
              name='height'
              placeholder={product.height}
              onChange={handleUpdate}
            />
            <label>Lenght</label>
            <input
              type='number'
              className='PLength'
              name='length'
              placeholder={product.length}
              onChange={handleUpdate}
            />
            <label>Weight</label>
            <input
              type='number'
              className='PWeight'
              name='weight'
              placeholder={product.weight}
              onChange={handleUpdate}
            />
            <fieldset>
              <legend>Size</legend>
              <input
                type='checkbox'
                className='SizeS'
                name='size'
                value='S'
                onClick={addSize}
              />
              <label> S</label>
              <br />
              <input
                type='checkbox'
                className='SizeM'
                name='size'
                value='M'
                onClick={addSize}
              />
              <label> M</label>
              <br />
              <input
                type='checkbox'
                className='SizeL'
                name='size'
                value='L'
                onClick={addSize}
              />
              <label> L</label>
              <br />
              <input
                type='checkbox'
                className='SizeXL'
                name='size'
                value='XL'
                onClick={addSize}
              />
              <label> XL</label>
              <br />
              <input
                type='checkbox'
                className='SizeXXL'
                name='size'
                value='XXL'
                onClick={addSize}
              />
              <label> XXL</label>
              <br />
            </fieldset>
            <br />
            <div className='addProductItem color'>
              <label>Color</label>
              <br />
              <input
                id='color-picker1'
                class='color-picker1'
                name='color1'
                type='color'
                onInput={() => {
                  haveColor('color-picker1');
                }}
              />
              <input
                id='color-picker2'
                class='color-picker2'
                name='color1'
                type='color'
                onInput={() => {
                  haveColor('color-picker2');
                }}
              />
              <input
                id='color-picker3'
                class='color-picker3'
                name='color1'
                type='color'
                onInput={() => {
                  haveColor('color-picker3');
                }}
              />
              <input
                id='color-picker4'
                class='color-picker4'
                name='color1'
                type='color'
                onInput={() => {
                  haveColor('color-picker4');
                }}
              />
              <input
                id='color-picker5'
                class='color-picker5'
                name='color1'
                type='color'
                onInput={() => {
                  haveColor('color-picker5');
                }}
              />
              <input
                id='color-picker6'
                class='color-picker6'
                name='color1'
                type='color'
                onInput={() => {
                  haveColor('color-picker6');
                }}
              />
            </div>
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
