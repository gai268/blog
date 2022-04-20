
import { useAppSelector } from "../../../stores/hooks";
import { postsSelector } from "../../../stores/post/selectors";
import { PostItem } from "../PostItem/PostItem";

export const PostList = () => {
    const posts = useAppSelector(postsSelector);
    return (
        <div>{
            Object.keys(posts).map(postId => {
                const post = posts[postId];
                return post ? <PostItem key={postId} postId={postId} post={post} /> : null
            })
        }</div>
    );
}