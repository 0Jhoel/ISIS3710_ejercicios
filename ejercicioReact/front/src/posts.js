import {useState} from "react";
import Post from "./post";

export default function Posts(){
    const postsList = [
        {
            id:1,
            title : "Título post 1",
            content:"contenido post 1",
            author:"autor del post 1",
        },
        {
            id:0,
            title : "Título post 0",
            content:"contenido post 0",
            author:"autor del post 0",
        },
        {
            id:2,
            title : "Título post 2",
            content:"contenido post 2",
            author:"autor del post 2",
        }
     ];

     const [posts, setPosts] = useState(postsList)

     const deleteItem = (id) => {
         const filter = posts.filter(p=> p.id !== id);
         setPosts(filter);
     }

     return (
         <div>
         {posts.map((post) => <Post key={post.id} post={post} metBorrar = {deleteItem}/>)}
         </div>
     );
}