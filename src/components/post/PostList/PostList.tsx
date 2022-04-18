
import { useAppSelector } from "../../../stores/hooks";
import { postsSelector } from "../../../stores/post/selectors";
import { PostItem } from "../PostItem/PostItem";

export const PostList = () => {
    const posts = useAppSelector(postsSelector);
    return (
        <div>{
            Object.keys(posts).map(key => {
                const post = posts[key];
                return post ? <PostItem key={key} postKey={key} post={post} /> : null
            })
        }</div>
    );
}