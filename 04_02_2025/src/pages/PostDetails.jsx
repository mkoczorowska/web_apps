import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState([]);


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            })
            .then(res => res.json())
            .then(setAuthor);


        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(setComments);
    }, [id]);
    
    if (!post) return <p>Ładowanie...</p>;


    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.body}</p>


            {author && (
                <p><strong>Autor:</strong> {author.name} ({author.email})</p>
            )}


            <h3>Komentarze</h3>
            {comments.map(c => (
                <div className="post-card" key={c.id}>
                    <strong>{c.email}</strong>
                    <p>{c.body}</p>
                </div>
            ))}
        </article>
    );
}