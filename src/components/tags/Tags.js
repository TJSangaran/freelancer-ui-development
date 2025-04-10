import { useState } from 'react';
import {
    Chip,
    Stack,
    Button,
} from '@mui/material'

const TAG_LENGTH = 4;

const Tags = ({ tags, ...props }) => {
    const [showTag, setShowTag] = useState(false)

    const onClickShowTag = () => {
        setShowTag(!showTag)
    }

    return (
        <Stack direction='row' sx={{ flexWrap: 'wrap' }} {...props}>
            {
                tags?.map((tag, id) => {
                    if (!showTag && id > TAG_LENGTH) return null
                    return (
                        <Chip key={id} label={tag} sx={{ m: 0.2 }} />
                    )
                })
            }
            {tags.length > TAG_LENGTH && <Button sx={{ textTransform: 'none', p: 0, px: 1 }} onClick={onClickShowTag}>{showTag ? "show less" : `+${tags.length - TAG_LENGTH} more`}</Button>}
        </Stack>
    );
}

export default Tags;