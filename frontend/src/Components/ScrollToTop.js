import { React, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <div
        onClick={scrollToTop}
        className="fa-solid fa-arrow-up back_to_top"
        style={{ display: visible ? "inline" : "none" }}
      >
        {" "}
      </div>
    </>
  );
};

export default ScrollToTop;
