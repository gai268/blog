import { Avatar, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../../stores/hooks';
import { linkBySelector, linksIdsSelector } from '../../../stores/links/selectors';
import { userAvatarSelector, userDiscriptionSelector, userNameSelector } from '../../../stores/user/selectors';
import {Highlight} from '../decoration/Highlight/Highlight';
export const Sidebar = () => {

  // selectors
  const userName = useAppSelector(userNameSelector)
  const userAvatar = useAppSelector(userAvatarSelector)
  const userDiscription = useAppSelector(userDiscriptionSelector)
  const linksIds = useAppSelector(linksIdsSelector)
  const linkBy = useAppSelector(linkBySelector)

  return (
    <>
      <Card elevation={0}>        
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>プロフィール</Typography>
          <Grid container spacing={2}>
            <Grid item><Avatar src={userAvatar?.url} /></Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2">
              {userName || "ユーザー名"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {userDiscription}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>          
      </Card>
      <Card elevation={0}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>関連リンク</Typography>
          <Stack direction="row" spacing={1}>
            {/* 関連リンク一覧 */}
            {linksIds.map(linkId => {
              const link = linkBy({id: linkId})
              return <Chip key={linkId}
                avatar={<Avatar alt={link?.text} src={link?.icon.url} />}
                component="a"
                href={link?.url} target="_blank"
                label={link?.text}
                variant="outlined"
                clickable
              />
            })}
          </Stack> 
        </CardContent>            
      </Card>
    </>
      
  )
}