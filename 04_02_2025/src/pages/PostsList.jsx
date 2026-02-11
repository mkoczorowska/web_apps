import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function PostsList() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(setPosts);
    }, []);


    return (
        <section>
            <h2>Lista postów</h2>
            {posts.slice(0, 20).map(post => (
                <div className="post-card" key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body.slice(0, 120)}...</p>
                    <Link to={`/posts/${post.id}`}>Czytaj więcej →</Link>
                </div>
            ))}
        </section>
    );
}