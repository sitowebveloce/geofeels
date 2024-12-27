"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sentiment from "sentiment";
import DOMPurify from "isomorphic-dompurify";

const MessageForm = ({
  message,
  setMessage,
  cityCoordinates,
  setScore,
  setInsertMarker,
}: {
  message: string;
  cityCoordinates: [number, number];
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setInsertMarker: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const sentiment = new Sentiment();

  useEffect(() => {
    if (cityCoordinates[0] === 0 || cityCoordinates[1] === 0) return;
    setIsDisable(false);
  }, [cityCoordinates]);

  const handleMessageClientAction = (formData: FormData) => {
    const messageForm = formData.get("message");

    const msg = DOMPurify.sanitize(messageForm as string);

    if (!messageForm) {
      toast.error("Please write your message");
      return;
    }
    // CHECK SENTIMENT
    const checkMessageSentiment = sentiment.analyze(msg as string);

    // SET SCORE
    setScore(checkMessageSentiment.score);

    // SET MESSAGE
    setMessage(messageForm as string);

    // SET INSERT MARKER
    setInsertMarker(true);
  };

  // RETURN
  return (
    <form
      action={handleMessageClientAction}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <label
        htmlFor="message"
        className="flex  items-center mb-2 text-gray-600 text-sm font-medium"
      >
        Message {message.length}/50
      </label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
        id="message"
        rows={2}
        className="block w-full h-auto px-4 py-2.5 text-base leading-7 font-normal shadow-xs text-white bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none"
        maxLength={50}
        placeholder="Write your english message"
      ></textarea>
      <div className="flex gap-2 justify-around items-center">
        <button
          disabled={isDisable}
          type="submit"
          className="py-1.5 px-3.5 text-xs max-h-max bg-slate-500 text-white rounded-full cursor-pointer font-medium leading-5 text-center shadow-xs transition-all duration-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
