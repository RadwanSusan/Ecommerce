import React from 'react';
import { useState, useEffect } from 'react';
import './mobileSearch.css';
import { AiOutlineSearch } from 'react-icons/ai';
import Table from './Table';
import axios from 'axios';

const MobileSearch = () => {
	const [queryName, setQueryName] = useState('');
	const [dataAll, setDataAll] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			if (queryName === '') {
				setDataAll([]);
				return;
			}
			const res = await axios.get(
				`http://localhost:4000/api/products/search/${queryName}`,
			);
			setDataAll(res.data);
		};
		if (queryName.length === 0 || queryName.length >= 1) fetchData();
	}, [queryName]);

	return (
		<div className='mobile-bottom snipcss-LAYO2'>
			<div className='container'>
				<div className='block-search-mobile'>
					<div className='block-content'>
						<div className='field search'>
							<div className='control'>
								<input
									id='searchbox'
									type='text'
									name='q'
									placeholder='Enter keywords to search...'
									className='input-text input-searchbox'
									maxLength='128'
									role='combobox'
									aria-haspopup='listbox'
									aria-expanded={dataAll.length > 0 ? 'true' : 'false'}
									aria-autocomplete='both'
									autoComplete='off'
									value={queryName}
									onChange={(e) =>
										setQueryName(e.target.value.toLowerCase())
									}
								/>
								<Table data={dataAll} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MobileSearch;
