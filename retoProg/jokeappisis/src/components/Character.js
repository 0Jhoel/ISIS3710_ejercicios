import {useState,useEffect} from "react";

const Character = () =>{

	const [character,setCharacter] = useState();
	useEffect(()=>{
		if(!navigator.onLine){
			if(localStorage.getItem("Character") === null){
				setCharacter("Loading…");
			}
			else{
                setCharacter(localStorage.getItem("Character"));
			}
		}
		fetch("http://gateway.marvel.com/v1/public/characters/1011334?ts=1&apikey=52c480118bb7817c642c345e56def1ca&hash=5b4071d6b10b8e22cab403be946857c6")
		.then(result=>result.json)
        .then(result=>{
		console.log("result",result);
		localStorage.setItem("Character",result.value);
		setCharacter(result.value);
		
		});
	},[]);

	return(
        <div>
            <h1>Character</h1>
            <p>{character}</p>
        </div>
	);
};
export default Character;