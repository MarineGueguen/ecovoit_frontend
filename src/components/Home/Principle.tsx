type Props = {
  value: {
    image: string,
    title: string,
    description: string,
  }
}

const Principle = ({ value }: Props) => {
  return (
    <figure className="text-center max-w-[250px]">
      <img 
        src={value.image}
        alt={value.title}
        className="h-[128px] mx-auto"
      />
      <figcaption>
        <h3 className="text-custom-green-2 text-xl font-semibold py-2">{value.title}</h3>
        <p>{value.description}</p>
      </figcaption>
    </figure>
  )
}

export default Principle;