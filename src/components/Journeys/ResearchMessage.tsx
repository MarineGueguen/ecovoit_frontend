import { FcSearch } from "react-icons/fc";
import { LOCATORS } from "../../constants/tests/journeysList";

type Props = {}

const ResearchMessage = (props: Props) => {

  const scrollToSection = () => {
    const element = document.getElementById("journeys-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center gap-1 text-base sm:text-xl font-medium py-12 px-4"
      data-testid={LOCATORS.noResearch}
    >
      <p>Où allons-nous aujourd'hui ?</p>
      <button className="flex items-center gap-1 text-custom-green-2" onClick={scrollToSection}>
        Lancer la recherche <FcSearch />
      </button>
    </div>
  )
}

export default ResearchMessage;