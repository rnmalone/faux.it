import {IconType} from "../components/Icon/Icon";

export interface INavigationRoute {
    displayName: string;
    route: string;
}

export const NAVIGATION_ROUTES = [
    {
        displayName: 'general.employees',
        route: '/employees',
        icon: IconType.Employee
    },
    {
        displayName: 'general.sales',
        route: '/sales',
        icon: IconType.Graph
    }
]
