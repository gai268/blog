import { CardActions, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image'
import { format } from "date-fns";
import noImage from "./images/no_image.png";
import { Entry } from "../../../stores/entry/types";
import { useAppDispatch } from "../../../stores/hooks";
import { addFavorite } from "../../../stores/entry/asyncThunks";

type EntryProps = {
    entryKey: string
    entry: Entry,
}

export const EntryItem = (props: EntryProps) => {
    const dispatch = useAppDispatch();

    const handleClickFavorite = () => {
        dispatch(addFavorite(props.entryKey))
    }

    return(
        <Card elevation={0} sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
            <CardContent sx={{ width: 151, flex: '1' }}>
                <Image src={noImage} alt={props.entry.title}/>
            </CardContent>
            <CardContent sx={{ flex: '3' }}>
                <Typography gutterBottom variant="h5" component="div">{props.entry.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {format(props.entry.createAt, 'yyyy-MM-dd')}
                </Typography>
                <Typography variant="body1">
                    {props.entry.body || "本文がありません。"}
                </Typography>
                <CardActions><Button size="small">Read More</Button></CardActions>
                <IconButton onClick={handleClickFavorite}><FavoriteBorderIcon /></IconButton>
                {props.entry.favoritesCount}
            </CardContent>
        </Card>
    );
}