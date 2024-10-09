import React, { useState } from "react";
import { FaPaperPlane, FaPlus, FaSmile, FaMicrophone } from "react-icons/fa";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import OptionsMenu from "./components/OptionsMenu";
import { useParams } from "react-router-dom";

const MessageInputArea = ({ onSendMessage, senderId }) => {
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { userId } = useParams();

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage({
        text: message,
        receiverId: parseInt(userId), // Ensure receiverId is available or passed in as props
        senderId: senderId,
        createdAt: new Date().toISOString(), // Adjust as necessary
      });
      setMessage(""); // Reset message input
    }
  };

  const toggleOptions = () => setShowOptions(!showOptions);
  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
  const addEmojiToMessage = (emoji) =>
    setMessage((prev) => prev + emoji.native);

  return (
    <div className="p-4 border-t bg-white shadow-lg flex items-center space-x-2 relative">
      {/* Plus button */}
      <IconButton onClick={toggleOptions} Icon={FaPlus} />

      {/* Emoji button */}
      <IconButton onClick={toggleEmojiPicker} Icon={FaSmile} />

      {/* Emoji Picker */}
      <EmojiPicker
        showEmojiPicker={showEmojiPicker}
        addEmojiToMessage={addEmojiToMessage}
      />

      {/* Document and Image/Video Options */}
      <OptionsMenu showOptions={showOptions} />

      {/* Message Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Send or Microphone Button */}
      {message.trim().length > 0 ? (
        <IconButton
          onClick={handleSendMessage}
          Icon={FaPaperPlane}
          additionalClasses="bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        />
      ) : (
        <IconButton Icon={FaMicrophone} />
      )}
    </div>
  );
};

export default MessageInputArea;
