import { CardActionArea, CardMedia, IconButton, Link, Stack } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image, { StaticImageData } from 'next/image'
import dayjs from 'dayjs'
import noImage from "./images/no_image.png";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { addFavorite } from "../../../stores/posts/asyncThunks";
import { EntityId } from "@reduxjs/toolkit";
import { postBySelector } from "../../../stores/posts/selectors";
import { useState } from "react";

type Props = {
    postId: EntityId
}

export const PostItem = (props: Props) => {
    const dispatch = useAppDispatch();

    // selectors
    const postBy = useAppSelector(postBySelector);

    // 投稿記事
    const post = postBy({id: props.postId})

    // local states
    const [src, setSrc] = useState<StaticImageData | string>(post?.eyecatch ? post.eyecatch.url : noImage)

    // handlers
    // お気に入りボタンクリック時
    const handleClickFavorite = () => {
        dispatch(addFavorite(props.postId))
    }
    // アイキャッチ画像が存在しない場合
    const handleErrorEyecatch = () => {
        setSrc(noImage)
    }

    return(
        <Card elevation={0} sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
            <Link href={`/posts/${props.postId}`} sx={{ width: 151, flex: '1' }}>
                <Image src={src} alt={post?.title} onError={handleErrorEyecatch} width={151} height={151} objectFit="contain"/>
            </Link>
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