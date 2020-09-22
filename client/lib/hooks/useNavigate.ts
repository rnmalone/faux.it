import {useHistory} from "react-router";

export default function useNavigate() {
    const history = useHistory()

    return (path: string) => () => void history.push(path)
}