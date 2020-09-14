export interface INavigationRoute {
    displayName: string;
    route: string;
}

export const NAVIGATION_ROUTES = [
    {
        displayName: 'Employees',
        route: '/employees'
    },
    {
        displayName: 'Sales',
        route: '/sales'
    }
]
