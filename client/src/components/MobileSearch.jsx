import React from "react";
import { useState } from "react";
import "./mobileSearch.css";
import { AiOutlineSearch } from "react-icons/ai";
import Table from "./Table";
import axios from "axios";
import { useEffect } from 'react';

	
	

const MobileSearch = () => {
	const [queryName, setQueryName] = useState("");
	const [dataAll, setDataAll] = useState([]);
	 useEffect(() => {
     const fetchData = async () => {
       if (queryName === "") {
         setDataAll([]);
         return;
       }
       const res = await axios.get(
         `http://localhost:4000/api/products/search/${queryName}`
       );
       setDataAll(res.data);
     };
     if (queryName.length === 0 || queryName.length >= 1) fetchData();
   }, [queryName]);
	


	return (
    <div class="mobile-bottom snipcss-LAYO2">
      <div class="container">
        <div class="block-search-mobile">
          <div class="block-content">
            <div class="field search">
              <div class="control">
                <input
									id="searchbox"
									type="text"
									name="q"
									placeholder="Enter keywords to search..."
									className="input-text input-searchbox"
									maxlength="128"
									role="combobox"
									aria-haspopup="false"
									aria-expanded="true"
									aria-autocomplete="both"
									autocomplete="off"
									value={queryName}
									onChange={(e) =>
										setQueryName(e.target.value.toLowerCase())
									}
                />
                {<Table data={dataAll} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileSearch;
