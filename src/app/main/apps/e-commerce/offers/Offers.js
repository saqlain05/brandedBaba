import React from "react";
import { FusePageCarded } from "@fuse";
import withReducer from "app/store/withReducer";
import OffersTable from "./OffersTable";
import OffersHeader from "./OffersHeader";
import reducer from "../store/reducers";

function Offers() {
	return (
		<FusePageCarded
			classes={{
				content: "flex",
				header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
			}}
			header={<OffersHeader />}
			content={<OffersTable />}
			innerScroll
		/>
	);
}

export default withReducer("eCommerceApp", reducer)(Offers);
