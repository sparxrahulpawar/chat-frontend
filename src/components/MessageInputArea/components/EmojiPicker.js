import React from 'react';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data"; // Emoji data

const EmojiPicker = ({ showEmojiPicker, addEmojiToMessage }) => {
  return (
    showEmojiPicker && (
      <div className="absolute bottom-16 left-12 z-10">
        <Picker data={data} onEmojiSelect={addEmojiToMessage} />
      </div>
    )
  );
};

export default EmojiPicker;
