import {useState} from "react";

function Post(props){

    console.log(props);

     const [post,setPost] = useState(props.post);


     return (
         <div>
         <h1>{post.title}</h1>
         <p>{post.content}</p>
         <p>{post.author}</p>
         <button onClick={()=>props.metBorrar(post.id)}>Like</button>
         </div>
     );
}

export default Post;