import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./post.module.scss";

export default function Post() {
    const { id } = useParams();

    const { data: post } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            return res.json();
        },
    });

    const { data: user } = useQuery({
        queryKey: ["user", post?.userId],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
            return res.json();
        },
        enabled: !!post,
    });

    const { data: comments } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            return res.json();
        },
    });

    if (!post) return <p>Loading...</p>;

    return (
        <div className={styles.Post}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            {user && <p className={styles.author}>AUTHOR: {user.name}</p>}
            <br/>
            <h3>COMMENTS</h3>
            {comments?.map((c: any) => (
                <div key={c.id} className={styles.comment}>
                    <strong>{c.email}</strong>
                    <p>{c.body}</p>
                </div>
            ))}
        </div>
    );
}