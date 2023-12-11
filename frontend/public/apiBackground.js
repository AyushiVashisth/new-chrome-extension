
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SAVE_HEADLINE') {
    axios.post('http://localhost:8080/headlines', request.data);
  }
});
