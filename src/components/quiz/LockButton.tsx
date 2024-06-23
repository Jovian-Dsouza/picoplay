import React, { useEffect, useState } from "react";

export function LockButton({ id, onClick }: { id: number; onClick: any }) {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setIsLocked(false);
  }, [id]);
  
  function handleClick() {
    if (isLocked) {
      return;
    }
    setIsLocked(true);
    onClick();
  }

  return (
    <div
      className="flex flex-row items-center justify-center"
      onClick={handleClick}
    >
      {isLocked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="mr-1"
        >
          <path
            d="M15 7.08333H14.1667V5.41667C14.1667 3.11667 12.3 1.25 10 1.25C7.7 1.25 5.83333 3.11667 5.83333 5.41667V7.08333H5C4.08333 7.08333 3.33333 7.83333 3.33333 8.75V17.0833C3.33333 18 4.08333 18.75 5 18.75H15C15.9167 18.75 16.6667 18 16.6667 17.0833V8.75C16.6667 7.83333 15.9167 7.08333 15 7.08333ZM7.5 5.41667C7.5 4.03333 8.61667 2.91667 10 2.91667C11.3833 2.91667 12.5 4.03333 12.5 5.41667V7.08333H7.5V5.41667ZM15 17.0833H5V8.75H15V17.0833ZM10 14.5833C10.9167 14.5833 11.6667 13.8333 11.6667 12.9167C11.6667 12 10.9167 11.25 10 11.25C9.08333 11.25 8.33333 12 8.33333 12.9167C8.33333 13.8333 9.08333 14.5833 10 14.5833Z"
            fill="black"
          />
        </svg>
      )}
      <div className="text-black text-sm font-dmsans font-semibold">
        {isLocked ? "Locked" : "Lock"}
      </div>
      {!isLocked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8.29501 16.59L12.875 12L8.29501 7.41L9.70501 6L15.705 12L9.70501 18L8.29501 16.59Z"
            fill="black"
          />
        </svg>
      )}
    </div>
  );
}
