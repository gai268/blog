import { CardActions, IconButton, Stack } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {props.post.title}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <AccessTimeIcon color="action" fontSize="small"/>
                    <Typography variant="subtitle2" color="text.secondary">
                        {dayjs.unix(props.post.publishedAt).format('YYYY.MM.DD')}
                    </Typography>
                </Stack>
                <Typography 
                    variant="body1" component={"div"} 
                    dangerouslySetInnerHTML={{__html: props.post.body || "本文がありません。"}}>
                </Typography>
                <IconButton onClick={handleClickFavorite}><FavoriteBorderIcon /></IconButton>
                {props.post.favoritesCount}
            </CardContent>
        </Card>
    );
}