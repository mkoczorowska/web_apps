import styles from './post.module.scss'
import {useEffect, useState} from "react";
import type {Post as PostType} from '../types/post.js'
import {useParams} from "react-router-dom";

export default function Post(){
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [post, setPost] = useState<PostType>()

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(response => response.json())
            .then(json => setPost(json as PostType))
            .catch(() => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);
    return <div className={styles.Post}>
        <h3>{post?.title}</h3>
        <p>{post?.body}</p>
    </div>
}