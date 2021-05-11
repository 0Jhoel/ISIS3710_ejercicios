import {useState,useEffect} from "react";

const Character = () =>{

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const [character,setCharacter] = useState();
	useEffect(()=>{
		var totalCharacters = 1478;
		var characterOffset = getRandomInt(0, totalCharacters);
		if(!navigator.onLine){
			if(localStorage.getItem("Character") === null){
				setCharacter("Loading…");
			}
			else{
                setCharacter(localStorage.getItem("Character"));
			}
		}
		fetch("http://gateway.marvel.com/v1/public/characters/1011334?ts=1&apikey=52c480118bb7817c642c345e56def1ca&hash=5b4071d6b10b8e22cab403be946857c6")
		.then((result)=>result.json())
        .then((result)=>{
			var data = result.data.results[0];
			var img = data.thumbnail.path + "."+data.thumbnail.extension
			localStorage.setItem("Character",data);
			setCharacter({...data,thumbnail:{...data.thumbnail,path:img}});
			console.log(character);
		});
	},[]);

	return(
        <div>
            <h1>Character</h1>
            <p>Name: {character.name}</p>
			<p>Id: {character.id}</p>
			<p>Biography: {character.description}</p>
			<img src={character.thumbnail.path} alt="character"/>
        </div>
	);
};
export default Character;