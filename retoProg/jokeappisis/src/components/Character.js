import {useState,useEffect} from "react";

const Character = () =>{

	const [character,setCharacter] = useState();

	const getRandomInt = (min, max) => {
		var r = Math.floor(Math.random() * (max - min + 1)) + min;
		return r.toString()
	}

	const toDataURL = url => fetch(url)
	.then(response => response.blob())
	.then(blob => new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.onerror = reject
		reader.readAsDataURL(blob)
	}));

	useEffect(()=>{
		if(!navigator.onLine){
			if(localStorage.getItem("character") === null){
				setCharacter("Loading…");
			}
			else{
                setCharacter(localStorage.getItem("character"));
			}
		}
		fetch("http://gateway.marvel.com/v1/public/characters/"+getRandomInt(1011300, 1011400)+"?ts=1&apikey=52c480118bb7817c642c345e56def1ca&hash=5b4071d6b10b8e22cab403be946857c6")
		.then((result)=>result.json())
        .then((result)=>{
			var data = result.data.results[0];
			var img = data.thumbnail.path + "."+data.thumbnail.extension;
			setCharacter({...data,thumbnail:{...data.thumbnail,path:img}});
			toDataURL(img)
			.then(dataUrl => {
				localStorage.setItem("character",{...data,thumbnail:{...data.thumbnail,path:dataUrl}});
			})
		});
	},[]);

	return (
        <div>
			{character ? (
				<div>
					<h1>Character</h1>
            		<p>Name: {character.name}</p>
					<p>Id: {character.id}</p>
					<p>Biography: {character.description}</p>
					<img src={character.thumbnail.path} alt="character"/>
				</div>
			): (
				<p>Loading...</p>
			  )}
        </div>
	);
};
export default Character;