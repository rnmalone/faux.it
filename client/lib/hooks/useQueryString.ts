import {useLocation} from "react-router";
import queryString from 'query-string';

export default function useQueryString() {
    const location = useLocation()

    return queryString.parse(location.search) || Object.create(null)
}