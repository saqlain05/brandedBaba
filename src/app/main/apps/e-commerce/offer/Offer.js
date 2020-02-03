import React, { useEffect, useState } from "react";
import {
	Button,
	Tab,
	Tabs,
	TextField,
	Icon,
	Typography
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, FusePageCarded } from "@fuse";
import { useForm } from "@fuse/hooks";
import { Link } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	productImageFeaturedStar: {
		position: "absolute",
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: "box-shadow",
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: "box-shadow",
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		"&:hover": {
			"& $productImageFeaturedStar": {
				opacity: 0.8
			}
		},
		"&.featured": {
			pointerEvents: "none",
			boxShadow: theme.shadows[3],
			"& $productImageFeaturedStar": {
				opacity: 1
			},
			"&:hover $productImageFeaturedStar": {
				opacity: 1
			}
		}
	}
}));

function Offer(props) {
	const dispatch = useDispatch();
	const offer = useSelector(({ eCommerceApp }) => eCommerceApp.offer);

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);

	useEffect(() => {
		function updateOfferState() {
			const params = props.match.params;
			const { offerId } = params;

			if (offerId === "new") {
				dispatch(Actions.newOffer());
			} else {
				dispatch(Actions.getOffer(offerId));
			}
		}

		updateOfferState();
	}, [dispatch, props.match.params]);

	useEffect(() => {
		if (
			(offer.data && !form) ||
			(offer.data && form && offer.data.id !== form.id)
		) {
			setForm(offer.data);
		}
	}, [form, offer.data, setForm]);

	function handleChangeTab(event, tabValue) {
		setTabValue(tabValue);
	}

	const handleUploadChange = async (e) => {
		const file = e.target.files[0];

		if (!file) {
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		const response = await axios.post(
			"http://13.235.187.206/api/save-offer-image",
			formData
		);
		setForm(_.set({ ...form }, `offer_banner_image`, response.data.image_url));
	};

	function canBeSubmitted() {
		return (
			form.offer_description.length > 0 &&
			form.offer_code.length > 0 &&
			form.offer_banner_image.length > 0 &&
			form.offer_discount === 0 &&
			!_.isEqual(offer.data, form)
		);
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: "p-0",
				header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
			}}
			header={
				form && (
					<div className='flex flex-1 w-full items-center justify-between'>
						<div className='flex flex-col items-start max-w-full'>
							<FuseAnimate animation='transition.slideRightIn' delay={300}>
								<Typography
									className='normal-case flex items-center sm:mb-12'
									component={Link}
									role='button'
									to='/apps/e-commerce/offers'
									color='inherit'>
									<Icon className='mr-4 text-20'>arrow_back</Icon>
									Offers
								</Typography>
							</FuseAnimate>

							<div className='flex items-center max-w-full'>
								<FuseAnimate animation='transition.expandIn' delay={300}>
									<img
										className='w-32 sm:w-48 mr-8 sm:mr-16 rounded'
										src={form.offer_banner_image}
										alt={form.offer_description}
									/>
								</FuseAnimate>
								<div className='flex flex-col min-w-0'>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography className='text-16 sm:text-20 truncate'>
											{form.offer_code ? form.offer_code : "New Offer"}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography variant='caption'>Offer Detail</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation='transition.slideRightIn' delay={300}>
							<Button
								className='whitespace-no-wrap'
								variant='contained'
								disabled={!canBeSubmitted()}
								onClick={() => {
									const params = props.match.params;
									const { offerId } = params;

									if (offerId === "new") {
										dispatch(Actions.saveOffer(form));
									} else {
										dispatch(Actions.updateOffer(form));
									}
								}}>
								Save
							</Button>
						</FuseAnimate>
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
					<Tab className='h-64 normal-case' label='Basic Info' />
					<Tab className='h-64 normal-case' label='Offer Banner' />
				</Tabs>
			}
			content={
				form && (
					<div className='p-16 sm:p-24 max-w-2xl'>
						{tabValue === 0 && (
							<div>
								<TextField
									className='mt-8 mb-16'
									error={form.offer_description === ""}
									required
									label='Name'
									autoFocus
									id='offer_description'
									name='offer_description'
									value={form.offer_description}
									onChange={handleChange}
									variant='outlined'
									fullWidth
								/>

								<TextField
									className='mt-8 mb-16'
									error={form.offer_code === ""}
									required
									label='Name'
									autoFocus
									id='offer_code'
									name='offer_code'
									value={form.offer_code}
									onChange={handleChange}
									variant='outlined'
									fullWidth
								/>
								<TextField
									className='mt-8 mb-16'
									error={form.offer_discount === ""}
									required
									label='Name'
									autoFocus
									id='offer_discount'
									name='offer_discount'
									value={form.offer_discount}
									onChange={handleChange}
									variant='outlined'
									fullWidth
								/>
							</div>
						)}

						{tabValue === 1 && (
							<div>
								<input
									accept='image/*'
									className='hidden'
									id='button-file'
									type='file'
									onChange={handleUploadChange}
								/>
								<div className='flex justify-center sm:justify-start flex-wrap'>
									<label
										htmlFor='button-file'
										className={clsx(
											classes.productImageUpload,
											"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
										)}>
										<Icon fontSize='large' color='action'>
											cloud_upload
										</Icon>
									</label>

									<div
										className={clsx(
											classes.productImageItem,
											"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
											"featured"
										)}
										key={form.offer_banner_image}>
										<Icon className={classes.productImageFeaturedStar}>
											star
										</Icon>
										<img
											className='max-w-none w-auto h-full'
											src={form.offer_banner_image}
											alt='product'
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer("eCommerceApp", reducer)(Offer);
