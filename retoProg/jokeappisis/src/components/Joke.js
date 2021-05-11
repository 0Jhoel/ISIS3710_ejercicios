import {useState,useEffect} from "react";

const Joke = () =>{

	const [joke,setJoke] = useState();
	useEffect(()=>{
		if(!navigator.onLine){
			if(localStorage.getItem("joke") === null){
				setJoke("Loading…");
			}
			else{
                setJoke(localStorage.getItem("joke"));
			}
		}
		fetch("https://api.chucknorris.io/jokes/random").then(result=>result.json)
        .then(result=>{
		localStorage.setItem("joke",result.value);
		setJoke(result.value);
		console.log("result",result);
		});
	},[]);

	return(
        <div>
            <h1>Joke</h1>
            <p>{joke}</p>
        </div>
	);
};
export default Joke;