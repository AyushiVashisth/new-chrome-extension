const headlines = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
function generateRhyme(originalHeadline) {
  return originalHeadline + " - Rhymed";
}
function getBiasSummary() {
  return "Neutral";
}

headlines.forEach((headline) => {
  const rhymingHeadline = generateRhyme(headline.innerText);
  const biasSummary = getBiasSummary();
  chrome.runtime.sendMessage({
    type: "SAVE_HEADLINE",
    data: {
      originalHeadline: headline.innerText,
      rhymingHeadline,
      biasSummary,
      articleLink: window.location.href
    }
  });
  headline.innerText = rhymingHeadline;
});
