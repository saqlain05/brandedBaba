import React from "react";
import {
	TableHead,
	TableSortLabel,
	TableCell,
	TableRow,
	Tooltip
} from "@material-ui/core";

const rows = [
	{
		id: "id",
		align: "left",
		disablePadding: false,
		label: "ID",
		sort: true
	},
	{
		id: "customer",
		align: "left",
		disablePadding: false,
		label: "Customer",
		sort: true
	},
	{
		id: "total",
		align: "right",
		disablePadding: false,
		label: "Total",
		sort: true
	},
	{
		id: "payment",
		align: "left",
		disablePadding: false,
		label: "Payment",
		sort: true
	},
	{
		id: "status",
		align: "left",
		disablePadding: false,
		label: "Status",
		sort: true
	},
	{
		id: "date",
		align: "left",
		disablePadding: false,
		label: "Date",
		sort: true
	}
];

function OrdersTableHead(props) {
	const createSortHandler = (property) => (event) => {
		props.onRequestSort(event, property);
	};

	// const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

	return (
		<TableHead>
			<TableRow className='h-64'>
				{rows.map((row) => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? "none" : "default"}
							sortDirection={
								props.order.id === row.id ? props.order.direction : false
							}>
							{row.sort && (
								<Tooltip
									title='Sort'
									placement={
										row.align === "right" ? "bottom-end" : "bottom-start"
									}
									enterDelay={300}>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default OrdersTableHead;
