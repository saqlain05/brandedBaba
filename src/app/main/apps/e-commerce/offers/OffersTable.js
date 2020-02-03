import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Checkbox
} from "@material-ui/core";

import { showMessage } from "app/store/actions/fuse";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import OffersTableHead from "./OffersTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function ProductsTable(props) {
	const dispatch = useDispatch();
	const offers = useSelector(({ eCommerceApp }) => eCommerceApp.offers.data);
	const searchText = useSelector(
		({ eCommerceApp }) => eCommerceApp.offers.searchText
	);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(offers);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: "asc",
		id: null
	});

	useEffect(() => {
		dispatch(Actions.getOffers());
	}, [dispatch]);

	useEffect(() => {
		console.log(offers);
		setData(
			searchText.length === 0
				? offers
				: _.filter(offers, (item) =>
						item.product_name.toLowerCase().includes(searchText.toLowerCase())
				  )
		);
	}, [offers, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = "desc";

		if (order.id === property && order.direction === "desc") {
			direction = "asc";
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map((n) => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push("/apps/e-commerce/offers/" + item.id);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, page) {
		setPage(page);
	}
	const handleDelete = async () => {
		for (var index in selected) {
			dispatch(Actions.deleteOffer(selected[index]));
		}

		setData([]);
		dispatch(Actions.getOffers());
		setData(
			searchText.length === 0
				? offers
				: _.filter(offers, (item) =>
						item.product_name.toLowerCase().includes(searchText.toLowerCase())
				  )
		);
		dispatch(showMessage({ message: "Deleted successfully" }));
	};

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className='w-full flex flex-col'>
			<FuseScrollbars className='flex-grow overflow-x-auto'>
				<Table className='min-w-xl' aria-labelledby='tableTitle'>
					<OffersTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						handleDelete={handleDelete}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								(o) => {
									switch (order.id) {
										case "description": {
											return o.category.product_name;
										}
										case "discount": {
											return o.category.category_name;
										}

										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n) => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className='h-64 cursor-pointer'
										hover
										role='checkbox'
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={(event) => handleClick(n)}>
										<TableCell
											className='w-48 px-4 sm:px-12'
											padding='checkbox'>
											<Checkbox
												checked={isSelected}
												onClick={(event) => event.stopPropagation()}
												onChange={(event) => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell
											className='w-52'
											component='th'
											scope='row'
											padding='none'>
											<img
												className='w-full block rounded'
												src={n.offer_banner_image}
												alt='offers banner'
											/>
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.offer_code}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.offer_description}
										</TableCell>

										<TableCell className='truncate' component='th' scope='row'>
											{n.offer_discount} %
										</TableCell>
										<TableCell className='truncate' component='th' scope='row'>
											{n.minimum_total_amount} ₹
										</TableCell>
										<TableCell className='truncate' component='th' scope='row'>
											{n.max_discount_amount} ₹
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				component='div'
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					"aria-label": "Previous Page"
				}}
				nextIconButtonProps={{
					"aria-label": "Next Page"
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(ProductsTable);
