import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Checkbox
} from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import ProductsTableHead from "./CategoriesTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function CategoriesTable(props) {
	const dispatch = useDispatch();
	const categories = useSelector(
		({ eCommerceApp }) => eCommerceApp.categories.data
	);
	const searchText = useSelector(
		({ eCommerceApp }) => eCommerceApp.categories.searchText
	);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(categories);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: "asc",
		id: null
	});

	useEffect(() => {
		dispatch(Actions.getCategories());
	}, [dispatch]);

	useEffect(() => {
		console.log(categories);
		setData(
			searchText.length === 0
				? categories
				: _.filter(categories, (item) =>
						item.product_name.toLowerCase().includes(searchText.toLowerCase())
				  )
		);
	}, [categories, searchText]);

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
		console.log(item);
		props.history.push("/apps/e-commerce/categories/" + item.id);
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
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								(o) => {
									switch (order.id) {
										case "category_name": {
											return o.category_name;
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

										<TableCell component='th' scope='row'>
											{n.category_name}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.subcategories.map((subcat) => (
												<div key={subcat.id}>{subcat.subcategory_name}</div>
											))}
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

export default withRouter(CategoriesTable);
