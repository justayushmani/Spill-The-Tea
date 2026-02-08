import UpvoteButton from "./UpvoteButton";

const TraumaCard = ({ post }) => {
  return (
    <div className="trauma-card">
      <div className="quote-mark">“</div>
      <p className="card-content">{post.content}</p>
      <div className="card-footer">
        <UpvoteButton
          postId={post._id}
          initialUpvotes={post.upvotes}
        />
      </div>
      <style>{`
        .trauma-card {
          background: #ffffff;
          border: 3px solid #000000;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 6px 6px 0px #FFD166;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .trauma-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0px #56CCF2;
        }
        .quote-mark {
          position: absolute;
          top: -10px;
          right: 20px;
          font-size: 8rem;
          line-height: 1;
          color: #f0f0f0;
          font-family: serif;
          pointer-events: none;
          z-index: 0;
        }
        .card-content {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #222222;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
          font-weight: 500;
          flex-grow: 1;
        }
        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
        }
     
        .card-footer button {
          background: #FF6B35;
          border: 2px solid #000;
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          cursor: pointer;
          font-weight: 600;
          color: #fff;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: inherit;
          box-shadow: 2px 2px 0px #000;
        }
        .card-footer button:hover {
          background: #FF0054;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px #000;
        }
        @media (max-width: 640px) {
          .trauma-card {
            padding: 1.5rem;
          }
          .card-content {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TraumaCard;
