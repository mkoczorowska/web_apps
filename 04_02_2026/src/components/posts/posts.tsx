import styles from './posts.module.scss'
import {useEffect, useState} from 'react'
import type {Post} from '../types/post.js'
import {Link} from "react-router";

export default function Posts(){
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [posts, setPosts] = useState<Array<Post>>([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setPosts(json as Array<Post>))
            .catch(() => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);
    return <div className={styles.Posts}>
        {isLoading && (
            <h1>Loading...</h1>
        )}
        {isError && (
            <h1>Something went wrong.</h1>
        )}
        {!isLoading && !isError && (
            <>
                <h1>Posts</h1>
                {posts.length > 0 && (
                    <ul>
                        {posts.map(p => (
                            <li key={p.id}>
                                <h4>
                                    {p.title}
                                </h4>
                                <p>
                                    {p.body.substring(0, 50)}...
                                </p>
                                <Link
                                    to={'/posts/' + p.id}
                                    className={styles.PostsPostLink}
                                >
                                    Read more
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </>
        )}
    </div>
}
