document.addEventListener("DOMContentLoaded", () => {
  // Add copy buttons to code blocks
  document.querySelectorAll("pre").forEach((pre) => {
    const button = document.createElement("button");
    button.className = "copy-btn";
    button.textContent = "Copy";

    button.addEventListener("click", () => {
      const code = pre.querySelector("code");
      const text = code ? code.innerText : pre.innerText;

      navigator.clipboard
        .writeText(text)
        .then(() => {
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    });

    pre.appendChild(button);
  });

  // Highlight active link in sidebar
  const currentPath = window.location.pathname;
  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    if (
      link.getAttribute("href") === currentPath ||
      (link.getAttribute("href") !== "/" &&
        currentPath.includes(link.getAttribute("href")))
    ) {
      link.classList.add("active");
    }
  });
});
