import React, { useState, useEffect } from "react";

function Greeting(props) {
  const { user } = props;
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const currentTime = new Date().getHours();
      let newGreeting;
      if (currentTime < 12) {
        newGreeting = "Chào buổi sáng, " + user.ten;
      } else if (currentTime < 18) {
        newGreeting = "Chào buổi chiều, " + user.ten;
      } else {
        newGreeting = "Chào buổi tối, " + user.ten;
      }
      setGreeting(newGreeting);
    };
    if (user) updateGreeting();
    const intervalId = setInterval(updateGreeting, 60 * 60 * 1000); // 60 phút
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div>
      <em>
        {greeting} <i className="tio-hand-wave text-warning"></i>
      </em>
    </div>
  );
}

export default Greeting;
