import { useNavigate } from "react-router-dom";

import { IoMdExit } from "react-icons/io";

type Props = {
    setToken: (value: any) => void;
}

const Logout = ({ setToken }: Props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken("");
        return navigate('/');
    }

    return (
        <button className="flex items-center gap-2" onClick={handleLogout}><IoMdExit />Déconnexion</button>
    );
};

export default Logout;
