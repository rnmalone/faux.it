import {IconType} from "../components/Icon/Icon";

export interface INavigationRoute {
    displayName: string;
    route: string;
}

export const NAVIGATION_ROUTES = [
    {
        displayName: 'Employees',
        route: '/employees',
        icon: IconType.Employee
    },
    {
        displayName: 'Sales',
        route: '/sales',
        icon: IconType.Graph
    }
]
