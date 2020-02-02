import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Checkbox,
	Button
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { FuseScrollbars } from "@fuse";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import SubcategoryTableHead from "./SubcategoryTableHead";
import { FuseAnimate } from "@fuse";
function SubcategoryTable(props) {
	const data = props.subcategories;

	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: "asc",
		id: null
	});

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
		props.history.push(
			`/apps/e-commerce/categories/${props.categoryId}/subcategory/${item.id}`
		);
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
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "right"
				}}>
				<FuseAnimate animation='transition.slideRightIn' delay={300}>
					<Button
						component={Link}
						to={`/apps/e-commerce/categories/${props.match.params.categoryId}/subcategory/new`}
						className='whitespace-no-wrap'
						variant='contained'>
						<span className='hidden sm:flex'>Add New Subcategory</span>
						<span className='flex sm:hidden'>New</span>
					</Button>
				</FuseAnimate>
			</div>
			<FuseScrollbars className='flex-grow overflow-x-auto'>
				<Table className='min-w-xl' aria-labelledby='tableTitle'>
					<SubcategoryTableHead
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
										case "subcategory_name": {
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
											{n.subcategory_name}
										</TableCell>
										<TableCell component='th' scope='row'>
											{n.sub_subcategories.map((sub_subcat) => {
												console.log(n);
												return (
													<div key={sub_subcat.id}>
														{sub_subcat.subcategory_name}
													</div>
												);
											})}
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

export default withRouter(SubcategoryTable);
