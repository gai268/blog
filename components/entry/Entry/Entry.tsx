import { CardActions } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from 'next/image'
import { format } from "date-fns";
import noImage from "./images/no_image.png";

type EntryProps = {
    title: string,
    createAt: Date,
    body: string | null
}

function Entry(props: EntryProps){
    return(
        <Card elevation={0} sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
            <CardContent sx={{ width: 151, flex: '1' }}>
                <Image src={noImage} alt={props.title}/>
            </CardContent>
            <CardContent sx={{ flex: '3' }}>
                <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {format(props.createAt, 'yyyy-MM-dd')}
                </Typography>
                <Typography variant="body1">
                    {props.body || "本文がありません。"}
                </Typography>
                <CardActions><Button size="small">Read More</Button></CardActions>
            </CardContent>
        </Card>
    );
}
export default Entry;