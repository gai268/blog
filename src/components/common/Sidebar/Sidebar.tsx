import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import {Highlight} from '../decoration/Highlight/Highlight';
export const Sidebar = () => {
    return (
        <Card elevation={0}>
            <CardContent>
              <Typography gutterBottom variant="subtitle1" component="div">
              Profile
              </Typography>
              <Grid container spacing={2}>
                <Grid item><Avatar src="/avatar.jpg" /></Grid>
                <Grid item xs={9}>
                  <Typography variant="subtitle2">
                  ユーザー名
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  こんにちは。ここには<Highlight>説明文</Highlight>が入ります。
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>            
        </Card>
    )
}