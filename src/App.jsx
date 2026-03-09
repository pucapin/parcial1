import { useEffect, useState } from 'react';
import './App.css';
import { DigimonCard } from './components/DigimonCard/DigimonCard';

function App() {

	const [digiList, setDigiList] = useState([]);
	const [nameInput, setNameInput] = useState("");
	const [imageInput, setImageInput] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		const getPokemons = async() => {
			try {
				await fetch('https://digi-api.com/api/v1/digimon?pageSize=10')
				.then((res) => res.json())
				.then((response) => setDigiList(response.content))
			} catch(error) {
				setErrorMessage(error);
			}
		}
		getPokemons();
	}, [])

	const deleteDigimon = (id) => {
		console.log(id)
		setDigiList(digiList.filter((digi) => digi.id !== id))
	}

	const pokemonList = digiList.map((digi) => {
		return (
			<DigimonCard key={digi.id} id={digi.id} name={digi.name} image={digi.image} deleteDigimon={deleteDigimon}/>
		)
	})

	const addNewDigimon = (e) => {
		e.preventDefault();

		if(nameInput == "") {
			setErrorMessage("Please fill out form!")
			setNameInput("");
			setImageInput("");
			return;
		}

		if(imageInput == "") {
			setErrorMessage("Please fill out form!")
			setNameInput("");
			setImageInput("");
			return;
		}
		
		setDigiList([...digiList, {
			id: digiList[digiList.length - 1].id + 1,
			name: nameInput,
			image: imageInput
		}]);

		setNameInput("");
		setImageInput("");
		setErrorMessage(null);
	}
	

	return (
	
	<>
	<h1>Add new Digimon</h1>
	<form onSubmit={addNewDigimon}>
		<input type="text" name="name" placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
		<input type="text" name="image" placeholder="Image URL" value={imageInput} onChange={(e) => setImageInput(e.target.value)} />
		<button>Add</button>
	</form>
	{errorMessage && <p>{errorMessage}</p>}
	<h1>Digimon List!</h1>
	{pokemonList}
	</>);
}

export default App;
