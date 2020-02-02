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
import SubcategoryTable from "./SubcategoryTable";
// import axios from "axios";

function Category(props) {
	const dispatch = useDispatch();
	const category = useSelector(({ eCommerceApp }) => eCommerceApp.category);

	// const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);

	useEffect(() => {
		function updateCategoryState() {
			const params = props.match.params;
			const { categoryId } = params;

			if (categoryId === "new") {
				dispatch(Actions.newCategory());
			} else {
				dispatch(Actions.getCategory(categoryId));
			}
		}

		updateCategoryState();
	}, [dispatch, props.match.params]);

	useEffect(() => {
		if (
			(category.data && !form) ||
			(category.data && form && category.data.id !== form.id)
		) {
			console.log(category.data);
			setForm(category.data);
		}
	}, [form, category.data, setForm]);

	function handleChangeTab(event, tabValue) {
		setTabValue(tabValue);
	}

	function canBeSubmitted() {
		return form.category_name.length > 0 && !_.isEqual(category.data, form);
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
									to='/apps/e-commerce/categories'
									color='inherit'>
									<Icon className='mr-4 text-20'>arrow_back</Icon>
									Categories
								</Typography>
							</FuseAnimate>

							<div className='flex items-center max-w-full'>
								<div className='flex flex-col min-w-0'>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography className='text-16 sm:text-20 truncate'>
											{form.category_name ? form.category_name : "New Category"}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation='transition.slideLeftIn' delay={300}>
										<Typography variant='caption'>Category Detail</Typography>
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
									const { categoryId } = params;

									if (categoryId === "new") {
										dispatch(Actions.saveCategory(form));
									} else {
										dispatch(
											Actions.updateCategory(
												props.match.params.categoryId,
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
					{props.match.params.categoryId === "new" ? null : (
						<Tab className='h-64 normal-case' label='Subcategories' />
					)}
				</Tabs>
			}
			content={
				form && (
					<div className='p-16 sm:p-24 max-w-2xl'>
						{tabValue === 0 && (
							<div>
								<TextField
									className='mt-8 mb-16'
									error={form.category_name === ""}
									required
									label='Category Name'
									autoFocus
									id='category_name'
									name='category_name'
									value={form.category_name}
									onChange={handleChange}
									variant='outlined'
									fullWidth
								/>
							</div>
						)}
						{tabValue === 1 && (
							<div>
								<SubcategoryTable
									history={props.history}
									categoryId={props.match.params.categoryId}
									subcategories={form.subcategories}
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

export default withReducer("eCommerceApp", reducer)(Category);
