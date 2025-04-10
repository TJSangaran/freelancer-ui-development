import React from 'react'
import { ChannelHeader, useChannelStateContext } from 'stream-chat-react'
import { getReceiverName } from '../../utils/channelHandler'

function CustomChannelHeader({ user, MenuIcon }) {
  var _c = useChannelStateContext('ChannelHeader'), channel = _c.channel
  return (
    <ChannelHeader MenuIcon={MenuIcon ? MenuIcon : () => <></>} title={getReceiverName(user, channel)} />
  )
}

export default CustomChannelHeader