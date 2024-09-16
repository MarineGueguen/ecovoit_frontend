import { BsFillSuitHeartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#FFEEAD]">
      <p className="flex items-center gap-2 py-1 text-sm md:text-base md:py-3">Made with <BsFillSuitHeartFill color="#D9534F" /> by Ecovoit Team, 2023 ©</p>
    </footer>
  );
}

export default Footer;