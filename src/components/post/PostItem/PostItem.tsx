import { CardMedia, IconButton, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image'
import dayjs from 'dayjs'
import noImage from "./images/no_image.png";
import { PostState } from "../../../stores/post/types";
import { useAppDispatch } from "../../../stores/hooks";
import { addFavorite } from "../../../stores/post/asyncThunks";

type Props = {
    postId: string
    post: PostState,
}

export const PostItem = (props: Props) => {
    const dispatch = useAppDispatch();

    const handleClickFavorite = () => {
        dispatch(addFavorite(props.postId))
    }

    return(
        <Card elevation={0} sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
            <CardMedia sx={{ width: 151, flex: '1' }}>
                <Link href={`/posts/${props.postId}`}>
                    <Image src={noImage} alt={props.post.title}/>
                </Link>
            </CardMedia>
            <CardContent sx={{ flex: '3' }}>
                <Typography gutterBottom variant="h6" component="div">
                    <Link href={`/posts/${props.postId}`} color="inherit">
                        {props.post.title}
                    </Link>
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {dayjs.unix(props.post.publishedAt).format('YYYY.MM.DD')}
                </Typography>
                <IconButton onClick={handleClickFavorite}><FavoriteBorderIcon /></IconButton>
                {props.post.favoritesCount}
            </CardContent>
        </Card>
    );
}