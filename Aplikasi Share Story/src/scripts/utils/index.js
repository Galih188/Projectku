export function showFormattedDate(date, locale = "en-US", options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setupSkipToContent(element, mainContent) {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    mainContent.setAttribute("tabindex", "-1");
    mainContent.focus();
    // Garis besar singkat untuk menunjukkan ke mana fokus berpindah
    const originalOutline = mainContent.style.outline;
    mainContent.style.outline = "2px solid var(--primary-color)";
    setTimeout(() => {
      mainContent.style.outline = originalOutline;
    }, 1500);
  });
}

export function transitionHelper({ skipTransition = false, updateDOM }) {
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {});
    return {
      ready: Promise.reject(Error("View transitions unsupported")),
      updateCallbackDone,
      finished: updateCallbackDone,
    };
  }

  return document.startViewTransition(updateDOM);
}
