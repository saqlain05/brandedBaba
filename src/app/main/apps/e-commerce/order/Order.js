import React, { useEffect, useState } from "react";
import {
	Avatar,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Icon,
	Tab,
	Tabs,
	Typography
} from "@material-ui/core";
import { FuseAnimate, FusePageCarded } from "@fuse";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withReducer from "app/store/withReducer";
// import OrdersStatus from "./OrdersStatus";
import OrderInvoice from "./OrderInvoice";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";

function Order(props) {
	const dispatch = useDispatch();
	const order = useSelector(({ eCommerceApp }) => eCommerceApp.order);

	const [tabValue, setTabValue] = useState(0);
	const [map, setMap] = useState("shipping");

	useEffect(() => {
		dispatch(Actions.getOrder(props.match.params.orderId));
	}, [dispatch, props.match.params.orderId]);

	function handleChangeTab(event, tabValue) {
		setTabValue(tabValue);
	}

	return (
		<FusePageCarded
			classes={{
				content: "flex",
				header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
			}}
			header={
				order && (
					<div className='flex flex-1 w-full items-center justify-between'>
						<div className='flex flex-1 flex-col items-center sm:items-start'>
							<FuseAnimate animation='transition.slideRightIn' delay={300}>
								<Typography
									className='normal-case flex items-center sm:mb-12'
									component={Link}
									role='button'
									to='/apps/e-commerce/orders'
									color='inherit'>
									<Icon className='mr-4 text-20'>arrow_back</Icon>
									Orders
								</Typography>
							</FuseAnimate>

							<div className='flex flex-col min-w-0 items-center sm:items-start'>
								<FuseAnimate animation='transition.slideLeftIn' delay={300}>
									<Typography className='text-16 sm:text-20 truncate'>
										{"Order " + order.id}
									</Typography>
								</FuseAnimate>

								<FuseAnimate animation='transition.slideLeftIn' delay={300}>
									<Typography variant='caption'>
										{"From " + order.address.full_name}
									</Typography>
								</FuseAnimate>
							</div>
						</div>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor='secondary'
					textColor='secondary'
					variant='scrollable'
					scrollButtons='auto'
					classes={{ root: "w-full h-64" }}>
					<Tab className='h-64 normal-case' label='Order Details' />
					<Tab className='h-64 normal-case' label='Products' />
					<Tab className='h-64 normal-case' label='Invoice' />
				</Tabs>
			}
			content={
				order && (
					<div className='p-16 sm:p-24 max-w-2xl w-full'>
						{/*Order Details*/}
						{tabValue === 0 && (
							<div>
								<div className='pb-48'>
									<div className='pb-16 flex items-center'>
										<Icon className='mr-16' color='action'>
											account_circle
										</Icon>
										<Typography className='h2' color='textSecondary'>
											Customer
										</Typography>
									</div>

									<div className='mb-24'>
										<div className='table-responsive mb-16'>
											<table className='simple'>
												<thead>
													<tr>
														<th>Name</th>
														<th>Email</th>
														<th>Phone</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<div className='flex items-center'>
																<Avatar className='mr-8' src={""} />
																<Typography className='truncate'>
																	{order.address.full_name}
																</Typography>
															</div>
														</td>
														<td>
															<Typography className='truncate'>
																{order.address.email}
															</Typography>
														</td>
														<td>
															<Typography className='truncate'>
																{order.address.phone}
															</Typography>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<ExpansionPanel
											elevation={1}
											expanded={map === "shipping"}
											onChange={() =>
												setMap(map !== "shipping" ? "shipping" : false)
											}>
											<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
												<Typography className='font-600'>
													Shipping Address
												</Typography>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails className='flex flex-col md:flex-row'>
												<Typography className='w-full md:max-w-256 mb-16 md:mb-0'>
													{`${order.address.full_address}, ${order.address.city}, ${order.address.state}, ${order.address.pincode}`}
												</Typography>
											</ExpansionPanelDetails>
										</ExpansionPanel>

										<ExpansionPanel
											elevation={1}
											expanded={map === "invoice"}
											onChange={() =>
												setMap(map !== "invoice" ? "invoice" : false)
											}>
											<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
												<Typography className='font-600'>
													Invoice Address
												</Typography>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails className='flex flex-col md:flex-row'>
												<Typography className='w-full md:max-w-256 mb-16 md:mb-0'>
													{`${order.address.full_address}, ${order.address.city}, ${order.address.state}, ${order.address.pincode}`}
												</Typography>
											</ExpansionPanelDetails>
										</ExpansionPanel>
									</div>
								</div>

								<div className='pb-48'>
									<div className='pb-16 flex items-center'>
										<Icon className='mr-16' color='action'>
											access_time
										</Icon>
										<Typography className='h2' color='textSecondary'>
											Order Status
										</Typography>
									</div>
								</div>

								<div className='pb-48'>
									<div className='pb-16 flex items-center'>
										<Icon className='mr-16' color='action'>
											attach_money
										</Icon>
										<Typography className='h2' color='textSecondary'>
											Payment
										</Typography>
									</div>
									<div className='table-responsive'>
										<table className='simple'>
											<thead>
												<tr>
													<th>TransactionID</th>
													<th>Payment Method</th>
													<th>Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<span className='truncate'>{order.payment_id}</span>
													</td>
													<td>
														<span className='truncate'>
															{order.payment_mode}
														</span>
													</td>
													<td>
														<span className='truncate'>
															{order.total_amount}
														</span>
													</td>
													<td>
														<span className='truncate'>{"12 November"}</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								{
									// <div className='pb-48'>
									// <div className='pb-16 flex items-center'>
									//     <Icon className='mr-16' color='action'>
									//         local_shipping
									//     </Icon>
									//     <Typography className='h2' color='textSecondary'>
									//         Shipping
									//     </Typography>
									// </div>
									// 	<div className='table-responsive'>
									// 		<table className='simple'>
									// 			<thead>
									// 				<tr>
									// 					<th>Tracking Code</th>
									// 					<th>Carrier</th>
									// 					<th>Weight</th>
									// 					<th>Fee</th>
									// 					<th>Date</th>
									// 				</tr>
									// 			</thead>
									// 			<tbody>
									// 				{order.shippingDetails.map((shipping) => (
									// 					<tr key={shipping.date}>
									// 						<td>
									// 							<span className='truncate'>
									// 								{shipping.tracking}
									// 							</span>
									// 						</td>
									// 						<td>
									// 							<span className='truncate'>
									// 								{shipping.carrier}
									// 							</span>
									// 						</td>
									// 						<td>
									// 							<span className='truncate'>
									// 								{shipping.weight}
									// 							</span>
									// 						</td>
									// 						<td>
									// 							<span className='truncate'>{shipping.fee}</span>
									// 						</td>
									// 						<td>
									// 							<span className='truncate'>{shipping.date}</span>
									// 						</td>
									// 					</tr>
									// 				))}
									// 			</tbody>
									// 		</table>
									//     </div>
									//</div>
								}
							</div>
						)}
						{/*Products*/}
						{tabValue === 1 && (
							<div className='table-responsive'>
								<table className='simple'>
									<thead>
										<tr>
											<th>ID</th>
											<th>Image</th>
											<th>Name</th>
											<th>Price</th>
											<th>Quantity</th>
										</tr>
									</thead>
									<tbody>
										{order.items.map((product) => (
											<tr key={product.id}>
												<td className='w-64'>{product.id}</td>
												<td className='w-80'>
													<img
														className='product-image'
														src={product.product_info.featuredImageId}
														alt='product'
													/>
												</td>
												<td>
													<Typography
														component={Link}
														to={"/apps/e-commerce/products/" + product.id}
														className='truncate'
														style={{
															color: "inherit",
															textDecoration: "underline"
														}}>
														{product.product_info.product_name}
													</Typography>
												</td>
												<td className='w-64 text-right'>
													<span className='truncate'>
														{product.product_info.mrp} ₹
													</span>
												</td>
												<td className='w-64 text-right'>
													<span className='truncate'>{product.quantity}</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						{/*Invoice*/}
						{tabValue === 2 && <OrderInvoice order={order} />}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer("eCommerceApp", reducer)(Order);
