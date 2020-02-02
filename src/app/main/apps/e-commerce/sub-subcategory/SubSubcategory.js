import React, { useEffect, useState } from "react";
import {
	Button,
	Tab,
	Tabs,
	TextField,
	Icon,
	Typography
} from "@material-ui/core";
import { FuseAnimate, FusePageCarded } from "@fuse";
import { useForm } from "@fuse/hooks";
import { Link } from "react-router-dom";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
// import axios from "axios";

function SubSubcategory(props) {
	const dispatch = useDispatch();
	const sub_subcategory = useSelector(
		({ eCommerceApp }) => eCommerceApp.sub_subcategory
	);

	// const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);

	useEffect(() => {
		function updateCategoryState() {
			const params = props.match.params;
			const { subcategoryId, categoryId, subSubcategoryId } = params;

			if (subSubcategoryId === "new") {
				dispatch(Actions.newSubSubcategory());
			} else {
				dispatch(
					Actions.getSubSubcategory(categoryId, subcategoryId, subSubcategoryId)
				);
			}
		}

		updateCategoryState();
	}, [dispatch, props.match.params]);

	useEffect(() => {
		if (
			(sub_subcategory.data && !form) ||
			(sub_subcategory.data && form && sub_subcategory.data.id !== form.id)
		) {
			console.log(sub_subcategory.data);
			setForm(sub_subcategory.data);
		}
	}, [form, sub_subcategory.data, setForm]);

	function handleChangeTab(event, tabValue) {
		setTabValue(tabValue);
	}

	function canBeSubmitted() {
		return (
			form.sub_subcategory_name.length > 0 &&
			!_.isEqual(sub_subcategory.data, form)
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
									to={`/apps/e-commerce/categories/${props.match.params.categoryId}/subcategory/${props.match.params.subcategoryId}`}
									color='inherit'>
									<Icon className='mr-4 text-20'>arrow_back</Icon>
									Sub Subcategories
								</Typography>
							</FuseAnimate>

							<div className='flex items-center max-w-full'>
								<div className='flex flex-col min-w-0'>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography className='text-16 sm:text-20 truncate'>
											{form.sub_subcategory_name
												? form.sub_subcategory_name
												: "New Sub Subcategory"}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography variant='caption'>
											Sub Subcategory Detail
										</Typography>
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
									const {
										categoryId,
										subcategoryId,
										subSubcategoryId
									} = params;

									if (subSubcategoryId === "new") {
										dispatch(
											Actions.saveSubSubcategory(
												categoryId,
												subcategoryId,
												form
											)
										);
									} else {
										dispatch(
											Actions.updateSubSubcategory(
												categoryId,
												subcategoryId,
												form
											)
										);
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
				</Tabs>
			}
			content={
				form && (
					<div className='p-16 sm:p-24 max-w-2xl'>
						{tabValue === 0 && (
							<div>
								<TextField
									className='mt-8 mb-16'
									error={form.sub_subcategory_name === ""}
									required
									label='Sub Subcategory Name'
									autoFocus
									id='sub_subcategory_name'
									name='sub_subcategory_name'
									value={form.sub_subcategory_name}
									onChange={handleChange}
									variant='outlined'
									fullWidth
								/>
							</div>
						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer("eCommerceApp", reducer)(SubSubcategory);
