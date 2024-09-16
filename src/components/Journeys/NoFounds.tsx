import { LOCATORS } from "../../constants/tests/journeysList"

type Props = {
  message?: string | undefined
}

const NoFounds = ({message}: Props) => {
  return (
    <p
      className='text-center text-base sm:text-xl font-medium py-12 px-4'
      data-testid={LOCATORS.noFounds}
    >
      { message ?? 'Aucun trajet ne correspond à votre recherche...' }
    </p>
  )
}

export default NoFounds