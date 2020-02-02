import React, { useEffect, useState } from "react";
import {
	Icon,
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
import ProductsTableHead from "./ProductsTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function ProductsTable(props) {
	const dispatch = useDispatch();
	const products = useSelector(
		({ eCommerceApp }) => eCommerceApp.products.data
	);
	const searchText = useSelector(
		({ eCommerceApp }) => eCommerceApp.products.searchText
	);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: "asc",
		id: null
	});

	useEffect(() => {
		dispatch(Actions.getProducts());
	}, [dispatch]);

	useEffect(() => {
		setData(
			searchText.length === 0
				? products
				: _.filter(products, (item) =>
						item.product_name.toLowerCase().includes(searchText.toLowerCase())
				  )
		);
	}, [products, searchText]);

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
		props.history.push("/apps/e-commerce/products/" + item.id);
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
			dispatch(Actions.deleteProduct(selected[index]));
		}

		setData([]);
		dispatch(Actions.getProducts());
		setData(
			searchText.length === 0
				? products
				: _.filter(products, (item) =>
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
					<ProductsTableHead
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
										case "name": {
											return o.category.product_name;
										}
										case "categories": {
											return o.category.category_name;
										}
										case "mrp": {
											return o.category.price;
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
											{n.images.length > 0 && n.featuredImageId ? (
												<img
													className='w-full block rounded'
													src={n.featuredImageId}
													alt={n.product_name}
												/>
											) : (
												<img
													className='w-full block rounded'
													src='assets/images/ecommerce/product-image-placeholder.png'
													alt={n.product_name}
												/>
											)}
										</TableCell>

										<TableCell component='th' scope='row'>
											{n.product_name}
										</TableCell>

										<TableCell className='truncate' component='th' scope='row'>
											{n.category ? n.category.category_name : ""}
										</TableCell>
										<TableCell className='truncate' component='th' scope='row'>
											{n.subcategory ? n.subcategory.subcategory_name : ""}
										</TableCell>
										<TableCell className='truncate' component='th' scope='row'>
											{n.sub_subcategory
												? n.sub_subcategory.sub_subcategory_name
												: ""}
										</TableCell>

										<TableCell component='th' scope='row' align='right'>
											{n.mrp} <span>₹</span>
										</TableCell>

										<TableCell component='th' scope='row' align='right'>
											{n.is_verified ? (
												<Icon className='text-green text-20'>check_circle</Icon>
											) : (
												<Icon className='text-red text-20'>remove_circle</Icon>
											)}
										</TableCell>
										<TableCell component='th' scope='row' align='right'>
											{n.inStock ? (
												<Icon className='text-green text-20'>check_circle</Icon>
											) : (
												<Icon className='text-red text-20'>remove_circle</Icon>
											)}
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
