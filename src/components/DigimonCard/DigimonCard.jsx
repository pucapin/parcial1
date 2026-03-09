export const DigimonCard = ({image, name, id, deleteDigimon}) => {
    return(
        <>
        <p>{id}</p>
        <h1>{name}</h1>
        <img src={image} alt="" />
        <button onClick={() => deleteDigimon(id)}>Delete Digimon!</button>
        </>
    )
}