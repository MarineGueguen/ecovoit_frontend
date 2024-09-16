import { Link } from "react-router-dom";

import Principle from "../components/Home/Principle";

import banner from "../assets/car-travel.jpg"
import communication from "../assets/communication.png";
import energy from "../assets/energy.png";
import money from "../assets/money.png";
import travel from "../assets/travel.png";

const Home = () => {

    const values = [
        {
            image: energy,
            title: "Economie d'énergie",
            description: "Diminuer le nombre de véhicules sur la route, c'est aussi diminuer les émissions de gaz à effet de serre et préserver notre belle planète.",
        },
        {
            image: communication,
            title: "Echanger avec les autres",
            description: "L'expérience du voyage, ça passe aussi par le fait de créer des liens sociaux.",
        },
        {
            image: money,
            title: "Réduire les coûts",
            description: "Partager les frais pour moins dépenser !",
        },
    ]

    return (
        <section className="grow">
            <div className="flex flex-col sm:flex-row justify-center">
                <img src={banner} alt="voyage en voiture" className="hidden sm:block max-w-[50%]" />
                <div className="sm:grow px-4 bg-custom-green-1">
                    <h2 className="text-center my-10 text-2xl font-medium">Bientôt un formulaire de recherche !</h2>
                </div>
            </div>
            <div className="px-4 sm:px-10 py-4 text-center container-size">
                <h1 className="text-3xl sm:text-4xl font-fredoka py-4">Ecovoit', c'est quoi ?</h1>
                <p className="py-4">
                    Chez Ecovoit', nous sommes fiers de proposer des solutions de transport respectueuses de l'environnement qui permettent de réduire les émissions de gaz à effet de serre et de préserver la planète. Notre mission est de faciliter la mobilité de chacun tout en préservant notre belle planète.
                </p>
                <p className="py-4">
                    Notre concept repose sur des valeurs fortes, telles que la sécurité, la convivialité et la confiance. Nous sommes convaincus que le covoiturage est une solution efficace pour lutter contre la pollution, réduire les coûts de transport et renforcer les liens sociaux.
                </p>
                <p className="py-4">
                    Que vous soyez étudiant, travailleur, ou simplement à la recherche d'une solution de transport abordable et écologique, Ecovoit' est là pour vous accompagner.
                </p>
                <p className="py-4">
                    Rejoignez la communauté et contribuez à la préservation de notre planète en choisissant Ecovoit' pour vos déplacements.
                </p>
            </div>
            <img src={travel} alt="voyage en voiture" className="max-w-[600px] w-full mx-auto" />
            <div className="flex flex-col sm:flex-row gap-16 mx-auto items-center justify-center py-8">
                {values.map((value) => (
                    <Principle key={value.title} value={value} />
                ))}
            </div>
            <div className="bg-[url('https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] w-full text-center">
                <div className="bg-white/70 h-full w-full py-16 text-3xl">
                    <h2 className="font-fredoka py-6 px-3">Et vous, vous partez où ?</h2>
                    <button className="bg-custom-green-2 hover:bg-custom-green-1 transition-all rounded-full py-2 px-4 text-xl font-medium">
                        <Link to="/trajets">Rechercher mon trajet !</Link>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Home;