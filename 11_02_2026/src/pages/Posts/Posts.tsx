import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./posts.module.scss";

export default function Posts() {
    const { data, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            return res.json();
        },
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className={styles.Posts}>
            <h1>POSTS</h1>
            <ul>
                {data.slice(0, 10).map((post: any) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}