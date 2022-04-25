import { CardMedia, IconButton, Link, Stack } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image'
import dayjs from 'dayjs'
import noImage from "./images/no_image.png";
import { Post } from "../../../stores/posts/types";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { addFavorite } from "../../../stores/posts/asyncThunks";
import { EntityId } from "@reduxjs/toolkit";
import { postBySelector } from "../../../stores/posts/selectors";

type Props = {
    postId: EntityId
}

export const PostItem = (props: Props) => {
    const dispatch = useAppDispatch();

    const postBy = useAppSelector(postBySelector);
    const post = postBy({id: props.postId})

    const handleClickFavorite = () => {
        dispatch(addFavorite(props.postId))
    }

    return(
        <Card elevation={0} sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
            <CardMedia sx={{ width: 151, flex: '1' }}>
                <Link href={`/posts/${props.postId}`}>
                    <Image src={noImage} alt={post?.title}/>
                </Link>
            </CardMedia>
            <CardContent sx={{ flex: '3' }}>
                <Typography gutterBottom variant="h6" component="div">
                    <Link href={`/posts/${props.postId}`} color="inherit">
                        {post?.title}
                    </Link>
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <AccessTimeIcon color="action" fontSize="small"/>
                    <Typography variant="subtitle2" color="text.secondary">
                        {post ? dayjs.unix(post.publishedAt).format('YYYY.MM.DD') : "-"}
                    </Typography>
                </Stack>
                <IconButton onClick={handleClickFavorite}><FavoriteBorderIcon /></IconButton>
                {post ? post.favoritesCount : "-"}
            </CardContent>
        </Card>
    );
}