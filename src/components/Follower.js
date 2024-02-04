import React from "react";

const Follower = ({ value, handleFollow, id, name }) => {
  return (
    <div>
      <form action={handleFollow}>
        <input name={name} value={value} type="hidden" id={id} />
        <button type="submit">Follow</button>
      </form>
    </div>
  );
};

export default Follower;
