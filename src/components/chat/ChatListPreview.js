import React, { useRef } from 'react';
import { useAuth } from "../../context/AuthContext";
import { getReceiverName } from '../../utils/channelHandler';

const UnMemoizedChannelPreviewMessenger =(
  props
) => {
  const {
    active,
    Avatar,
    channel,
    displayImage,
    displayTitle,
    latestMessage,
    setActiveChannel,
    unread,
    watchers,
  } = props;
  const channelPreviewButton = useRef(null);
  const { user } = useAuth()
  const activeClass = active ? 'str-chat__channel-preview-messenger--active' : '';
  const unreadClass = unread && unread >= 1 ? 'str-chat__channel-preview-messenger--unread' : '';

  const avatarName =
    displayTitle || channel.state.messages[channel.state.messages.length - 1]?.user?.id;

  const onSelectChannel = () => {
    if (setActiveChannel) {
      setActiveChannel(channel, watchers);
    }
    if (channelPreviewButton?.current) {
      channelPreviewButton.current.blur();
    }
  };

  return (
    <button
      aria-label={`Select Channel: ${displayTitle || ''}`}
      aria-selected={active}
      className={`str-chat__channel-preview-messenger ${unreadClass} ${activeClass}`}
      data-testid='channel-preview-button'
      onClick={onSelectChannel}
      ref={channelPreviewButton}
      role='option'
    >
      <div className='str-chat__channel-preview-messenger--left'>
        {/* <Avatar image={displayImage} name={avatarName} size={40} /> */}
      </div>
      <div className='str-chat__channel-preview-messenger--right'>
        <div className='str-chat__channel-preview-messenger--name'>
          <span>{getReceiverName(user, channel)}</span>
        </div>
        <div className='str-chat__channel-preview-messenger--last-message'>{latestMessage}</div>
      </div>
    </button>
  );
};

/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 * Its best suited for messenger type chat.
 */
export default React.memo(
  UnMemoizedChannelPreviewMessenger,
)