import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse/index";
import { appsConfigs } from "app/main/apps/appsConfigs";
import { pagesConfigs } from "app/main/pages/pagesConfigs";
import { authRoleExamplesConfigs } from "app/main/auth/authRoleExamplesConfigs";
import { UserInterfaceConfig } from "app/main/user-interface/UserInterfaceConfig";
import { LoginConfig } from "app/main/login/LoginConfig";
import { LogoutConfig } from "app/main/logout/LogoutConfig";

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	...authRoleExamplesConfigs,
	UserInterfaceConfig,
	LoginConfig,
	LogoutConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: "/",
		exact: true,
		component: () => <Redirect to='/apps/dashboards/e-commerce/products' />
	},
	{
		component: () => <Redirect to='/pages/errors/error-404' />
	}
];

export default routes;
