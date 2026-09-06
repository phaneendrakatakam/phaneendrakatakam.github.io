// Portfolio content configuration
// Change the quote below anytime, then commit and push to redeploy on GitHub Pages.

window.PORTFOLIO_CONFIG = {
  quote: "Good engineering is not only about building systems — it is about understanding what the system needs to solve.",
  quoteAuthor: "Phaneendra Katakam"
};

const quoteEl = document.getElementById("portfolioQuote");
const quoteAuthorEl = document.getElementById("portfolioQuoteAuthor");

if (quoteEl && window.PORTFOLIO_CONFIG?.quote) {
  quoteEl.textContent = window.PORTFOLIO_CONFIG.quote;
}

if (quoteAuthorEl && window.PORTFOLIO_CONFIG?.quoteAuthor) {
  quoteAuthorEl.textContent = `— ${window.PORTFOLIO_CONFIG.quoteAuthor}`;
}
