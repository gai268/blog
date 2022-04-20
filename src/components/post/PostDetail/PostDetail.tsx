import { CardActions, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { format } from "date-fns";
import { Post } from "../../../stores/post/types";
import { useAppDispatch } from "../../../stores/hooks";
import { addFavorite } from "../../../stores/post/asyncThunks";

type Props = {
    postId: string
    post: Post,
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
                    {format(props.post.createAt, 'yyyy-MM-dd')}
                </Typography>
                <Typography variant="body1">
                    {props.post.body || "本文がありません。"}
                </Typography>
                <CardActions><Button size="small">Read More</Button></CardActions>
                <IconButton onClick={handleClickFavorite}><FavoriteBorderIcon /></IconButton>
                {props.post.favoritesCount}
            </CardContent>
        </Card>
    );
}