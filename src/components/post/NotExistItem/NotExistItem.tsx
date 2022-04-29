import { Card } from "@mui/material"

export const NotExistItem = () => {
    return (
        <Card elevation={0} sx={{ 
            display: 'flex', 
            flexWrap: 'nowrap', 
            flexDirection: 'row', 
            justifyContent: 'center',
            margin: 10
            }}>
            記事が存在しません
        </Card>
    )
}