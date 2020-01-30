import React, { useEffect, useState } from "react";
import {
	Button,
	Tab,
	Tabs,
	TextField,
	InputAdornment,
	Icon,
	Typography,
	InputLabel,
	Select,
	MenuItem,
	FormControl
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, FusePageCarded, FuseChipSelect } from "@fuse";
import { useForm } from "@fuse/hooks";
import { Link } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import axios from "axios";
import AWS from "aws-sdk";

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

function Product(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const { form, handleChange, setForm } = useForm(null);
	useEffect(() => {
		//configuring the AWS environment
		AWS.config.update({
			accessKeyId: "AKIAILVU3EZSDE7OZX2A",
			secretAccessKey: "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"
		});
	}, []);
	useEffect(() => {
		if (form) {
			const fetchSubcategories = async () => {
				const response = await axios.get(
					`http://13.233.225.39/api/category/${form.category_id}/subcategories`
				);
				const data = response.data.subcategories;
				console.log(data);
				setSubcategories(data);
			};
			if (form.category_id) fetchSubcategories();
		}
	}, [form]);

	useEffect(() => {
		fetchCategories();

		function updateProductState() {
			const params = props.match.params;
			const { productId } = params;

			if (productId === "new") {
				dispatch(Actions.newProduct());
			} else {
				dispatch(Actions.getProduct(productId));
			}
		}

		updateProductState();
	}, [dispatch, props.match.params]);

	useEffect(() => {
		if (
			(product.data && !form) ||
			(product.data && form && product.data.id !== form.id)
		) {
			setForm(product.data);
		}
	}, [form, product.data, setForm]);

	function handleChangeTab(event, tabValue) {
		setTabValue(tabValue);
	}

	function handleChipChange(value, name) {
		setForm(
			_.set({ ...form }, name, value.map((item) => item.value).join(","))
		);
	}

	function setFeaturedImage(id) {
		setForm(_.set({ ...form }, "featuredImageId", id));
	}

	const handleUploadChange = async (e) => {
		const file = e.target.files[0];
		console.log(file);

		if (!file) {
			return;
		}
		const gcsname = new Date().toISOString() + "-" + file.filename;

		let s3, params;

		s3 = new AWS.S3();

		const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
		var folder = "product-images";
		params = {
			Bucket: "brandedbaba-bucket",
			Body: file,
			Key: `${folder}/${gcsname}`,
			ContentType: file.type,
			ACL: "public-read"
		};

		const response = await s3.upload(params, options).promise();

		setForm(_.set({ ...form }, `images`, [response.Location, ...form.images]));
	};

	function canBeSubmitted() {
		console.log(form);
		return (
			form.product_name.length > 0 &&
			form.description.length > 0 &&
			form.category_id.length > 0 &&
			(form.subcat_id ? form.subcat_id.length > 0 : true) &&
			form.images.length > 0 &&
			!_.isEqual(product.data, form)
		);
	}

	const fetchCategories = async () => {
		const response = await axios.get("http://13.233.225.39/api/category");
		const data = response.data.categories;
		setCategories(data);
	};

	const renderCategories = () => {
		return categories.map((category) => {
			return (
				<MenuItem key={category.id} value={category.id}>
					{category.category_name}
				</MenuItem>
			);
		});
	};
	const renderSubcategories = () => {
		return subcategories.map((category) => {
			return (
				<MenuItem key={category.id} value={category.id}>
					{category.subcategory_name}
				</MenuItem>
			);
		});
	};

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
									to='/apps/e-commerce/products'
									color='inherit'>
									<Icon className='mr-4 text-20'>arrow_back</Icon>
									Products
								</Typography>
							</FuseAnimate>

							<div className='flex items-center max-w-full'>
								<FuseAnimate animation='transition.expandIn' delay={300}>
									{form.images.length > 0 && form.featuredImageId ? (
										<img
											className='w-32 sm:w-48 mr-8 sm:mr-16 rounded'
											src={
												_.find(form.images, { id: form.featuredImageId }).url
											}
											alt={form.product_name}
										/>
									) : (
										<img
											className='w-32 sm:w-48 mr-8 sm:mr-16 rounded'
											src='assets/images/ecommerce/product-image-placeholder.png'
											alt={form.product_name}
										/>
									)}
								</FuseAnimate>
								<div className='flex flex-col min-w-0'>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography className='text-16 sm:text-20 truncate'>
											{form.product_name ? form.product_name : "New Product"}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography variant='caption'>Product Detail</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation='transition.slideRightIn' delay={300}>
							<Button
								className='whitespace-no-wrap'
								variant='contained'
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(Actions.saveProduct({ form }))}>
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
					<Tab className='h-64 normal-case' label='Product Images' />
					<Tab className='h-64 normal-case' label='Pricing' />
					<Tab className='h-64 normal-case' label='Inventory' />
				</Tabs>
			}
			content={
				form && (
					<div className='p-16 sm:p-24 max-w-2xl'>
						{tabValue === 0 && (
							<div>
								<TextField
									className='mt-8 mb-16'
									error={form.product_name === ""}
									required
									label='Name'
									autoFocus
									id='product_name'
									name='product_name'
									value={form.product_name}
									onChange={handleChange}
									variant='outlined'
									fullWidth
								/>

								<TextField
									className='mt-8 mb-16'
									required
									id='description'
									name='description'
									onChange={handleChange}
									label='Description'
									type='text'
									value={form.description}
									multiline
									rows={5}
									variant='outlined'
									fullWidth
								/>
								<TextField
									className='mt-8 mb-16'
									error={form.seller === ""}
									required
									label='Seller Name'
									autoFocus
									id='seller'
									name='seller'
									value={form.seller}
									onChange={handleChange}
									variant='outlined'
									fullWidth
								/>
								<FormControl className={classes.formControl}>
									<InputLabel id='category_id-label'>Category</InputLabel>
									<Select
										required
										id='category_id'
										name='category_id'
										value={form.category_id}
										onChange={handleChange}
										className={classes.selectEmpty}>
										{renderCategories()}
									</Select>
								</FormControl>
								<br />
								{form.category_id.length !== 0 ? (
									<FormControl className={classes.formControl}>
										<InputLabel id='category_id-label'>Sub Category</InputLabel>
										<Select
											required
											id='subcat_id'
											name='subcat_id'
											value={form.subcat_id}
											onChange={handleChange}
											className={classes.selectEmpty}>
											{renderSubcategories()}
										</Select>
									</FormControl>
								) : null}
								<FuseChipSelect
									className='mt-8 mb-16'
									value={form.highlights.split(",").map((item) => ({
										value: item,
										label: item
									}))}
									onChange={(value) => handleChipChange(value, "highlights")}
									placeholder='Select multiple highlights'
									textFieldProps={{
										label: "Tags",
										InputLabelProps: {
											shrink: true
										},
										variant: "outlined"
									}}
									isMulti
								/>
								<FuseChipSelect
									className='mt-8 mb-16'
									value={form.specs.split(",").map((item) => ({
										value: item,
										label: item
									}))}
									onChange={(value) => handleChipChange(value, "specs")}
									placeholder='Select multiple specs'
									textFieldProps={{
										label: "Specs",
										InputLabelProps: {
											shrink: true
										},
										variant: "outlined"
									}}
									isMulti
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
									{form.images.map((media) => (
										<div
											onClick={() => setFeaturedImage(media)}
											className={clsx(
												classes.productImageItem,
												"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
												media === form.featuredImageId && "featured"
											)}
											key={media}>
											<Icon className={classes.productImageFeaturedStar}>
												star
											</Icon>
											<img
												className='max-w-none w-auto h-full'
												src={media}
												alt='product'
											/>
										</div>
									))}
								</div>
							</div>
						)}
						{tabValue === 2 && (
							<div>
								<TextField
									className='mt-8 mb-16'
									label='MRP'
									id='mrp'
									name='mrp'
									value={form.mrp}
									onChange={handleChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>₹</InputAdornment>
										)
									}}
									type='number'
									variant='outlined'
									autoFocus
									fullWidth
								/>

								<TextField
									className='mt-8 mb-16'
									label='Discounted Price'
									id='discounted_price'
									name='discounted_price'
									value={form.discounted_price}
									onChange={handleChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>₹</InputAdornment>
										)
									}}
									type='number'
									variant='outlined'
									fullWidth
								/>

								<TextField
									className='mt-8 mb-16'
									label='Discount'
									id='discount'
									name='discount'
									value={form.discount}
									onChange={handleChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>%</InputAdornment>
										)
									}}
									type='number'
									variant='outlined'
									fullWidth
								/>
							</div>
						)}
						{tabValue === 3 && (
							<div>
								<FormControl className={classes.formControl}>
									<InputLabel id='inStock-label'>In Stock</InputLabel>
									<Select
										id='inStock'
										name='inStock'
										value={form.inStock}
										onChange={handleChange}
										className={classes.selectEmpty}>
										<MenuItem key={"True"} value={true}>
											True
										</MenuItem>
										<MenuItem key={"False"} value={false}>
											False
										</MenuItem>
									</Select>
								</FormControl>
								<div>
									<FormControl className={classes.formControl}>
										<InputLabel id='is_verified-label'>Is Verified</InputLabel>
										<Select
											id='is_verified'
											name='is_verified'
											value={form.is_verified}
											onChange={handleChange}
											className={classes.selectEmpty}>
											<MenuItem key={"True"} value={true}>
												True
											</MenuItem>
											<MenuItem key={"False"} value={false}>
												False
											</MenuItem>
										</Select>
									</FormControl>
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

export default withReducer("eCommerceApp", reducer)(Product);
