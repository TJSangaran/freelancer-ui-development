import React from 'react'
import { ChannelHeader, useChannelStateContext } from 'stream-chat-react'
import { getReceiverName } from '../../utils/channelHandler'
import { Box, Stack } from '@mui/material';

function CustomChannelHeader({ user, MenuIcon }) {
  var _c = useChannelStateContext('ChannelHeader'), channel = _c.channel
  return (
    <div className='str-chat__header-livestream'>
      <ChannelHeader title={getReceiverName(user, channel)} />
      <Box sx={{ pr: 2 }}>
        {MenuIcon && <MenuIcon />}
      </Box>
    </div>
  )
}

export default CustomChannelHeader