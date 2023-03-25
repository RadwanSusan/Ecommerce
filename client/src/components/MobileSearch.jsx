import React from "react";
import { useState } from "react";
import "./mobileSearch.css";
import { AiOutlineSearch } from "react-icons/ai";

const MobileSearch = () => {
	return (
		<div class="mobile-bottom snipcss-LAYO2">
			<div class="container">
				<div class="block-search-mobile">
					<div class="block-content">
						<form
							class="form minisearch"
							id="search_mini_form_mobile"
							action="http://magento2.magentech.com/themes/sm_venuse/pub/french/catalogsearch/result/"
							method="get"
						>
							<div class="field search">
								<div class="control">
									<input
										id="search-mobile"
										type="text"
										name="q"
										value=""
										placeholder="Search entire store here..."
										class="input-text"
										maxlength="128"
										aria-haspopup="false"
										aria-autocomplete="both"
										autocomplete="off"
									/>
									<div
										id="search_autocomplete_mobile"
										class="search-autocomplete"
									></div>
								</div>
							</div>
							<div class="actions">
								<button
									type="submit"
									title="Search"
									class="action search"
									disabled=""
								>
									<AiOutlineSearch />
									<span>Search</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MobileSearch;
