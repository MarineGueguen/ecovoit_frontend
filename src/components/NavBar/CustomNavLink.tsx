import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  localisation: string;
  label: string;
  icon?: ReactNode;
  setShowDropdownMenu: (value: boolean) => void;
}

const CustomNavLink = ({ localisation, label, icon, setShowDropdownMenu }: Props) => {
  return (
    <li className="px-4 py-2">
      <Link
        to={localisation}
        className="flex items-center gap-2"
        onClick={() => setShowDropdownMenu(false)}
      >
        {icon && icon}{label}
      </Link>
    </li>
  )
}

export default CustomNavLink