// contentScript.js
import { generateRhyme, getBiasSummary } from './helpers';

const headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

headlines.forEach((headline) => {
  const rhymingHeadline = generateRhyme(headline.innerText);
  const biasSummary = getBiasSummary();

  // Save changed headline, rhyming headline, bias summary, and article link to the server
  chrome.runtime.sendMessage({
    type: 'SAVE_HEADLINE',
    data: {
      originalHeadline: headline.innerText,
      rhymingHeadline,
      biasSummary,
      articleLink: window.location.href,
    }
  });

  // Change the headline on the page
  headline.innerText = rhymingHeadline;
});
