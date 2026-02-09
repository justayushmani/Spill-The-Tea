import { useState } from "react";
import api from "../api/axios";

const UpvoteButton = ({ postId, initialUpvotes }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);

  const handleUpvote = async () => {
    try {
      const res = await api.post(`/trauma/${postId}/upvote`);
      setUpvotes(res.data.upvotes);
    } catch (err) {
      alert(err.response?.data?.msg || "Login to upvote");
    }
  };

  return (
    <button onClick={handleUpvote}>
      👍 {upvotes}
    </button>
  );
};

export default UpvoteButton;
