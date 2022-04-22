import { CardActions, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import dayjs from 'dayjs'
import { PostState } from "../../../stores/post/types";
import { useAppDispatch } from "../../../stores/hooks";
import { addFavorite } from "../../../stores/post/asyncThunks";

type Props = {
    postId: string
    post: PostState,
}

export const PostDetail = (props: Props) => {
    const dispatch = useAppDispatch();

    const handleClickFavorite = () => {
        dispatch(addFavorite(props.postId))
    }

    return(
        <Card elevation={0} sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
            <CardContent sx={{ flex: '3' }}>
                <Typography gutterBottom variant="h5" component="div">{props.post.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {dayjs.unix(props.post.publishedAt).format('YYYY.MM.DD')}
                </Typography>
                <Typography variant="body1">
                    {props.post.body || "本文がありません。"}
                </Typography>
                <IconButton onClick={handleClickFavorite}><FavoriteBorderIcon /></IconButton>
                {props.post.favoritesCount}
            </CardContent>
        </Card>
    );
}