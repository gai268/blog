import { CardActions, CardHeader, IconButton, Stack } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { addFavorite } from "../../../stores/posts/asyncThunks";
import { EntityId } from "@reduxjs/toolkit";
import { postBySelector } from "../../../stores/posts/selectors";
import { useEffect } from "react";

type Props = {
    postId: EntityId
}

export const PostDetail = (props: Props) => {
    const dispatch = useAppDispatch();

    // selectors
    const postBy = useAppSelector(postBySelector);
    const post = postBy({id: props.postId})

    // handlers
    const handleClickFavorite = () => {
        dispatch(addFavorite(props.postId))
    }

    return(
        <Card elevation={0}>
            <CardHeader sx={{ fontWeight: 'bold' }} 
                title={post?.title}
                subheader={
                    <Stack direction="row" alignItems="center" gap={1}>
                        <AccessTimeIcon color="action" fontSize="small"/>
                        <Typography variant="subtitle2" color="text.secondary">
                            {post ? dayjs.unix(post.publishedAt).format('YYYY.MM.DD') : "-"}
                        </Typography>
                    </Stack>
                }
            />
            <CardContent>  
                <Typography 
                    variant="body1" component={"div"} 
                    dangerouslySetInnerHTML={{__html: post?.body || "本文がありません。"}}>
                </Typography>
                {/* <IconButton onClick={handleClickFavorite}><FavoriteBorderIcon /></IconButton>
                {post ? post.favoritesCount : "-"} */}
            </CardContent>
        </Card>
    );
}