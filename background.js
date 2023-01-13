// Set up the Twitter API client
var TWITTER_API_KEY = "DFhDDrRONMOdwrsgeqLsbwIUd";
var TWITTER_API_SECRET = "jO6veHLPrGPqottB8tu3J7jA0uFNIVAHrEOOfS7piDO8d0qrO2";

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "get_hashtags") {
    // Get the tweet text from the message
    var tweet = message.tweet;

    // Use the Twitter API to search for hashtags related to the tweet
    searchTwitter(tweet, function(hashtags) {
      // Send the hashtags back to the content script
      sendResponse({
        hashtag_list: hashtags
      });
    });
  }
});

// Function to search Twitter using the API
function searchTwitter(query, callback) {
  // Make a request to the Twitter API search endpoint
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitter.com/1.1/search/tweets.json?q=" + encodeURIComponent(query));
  xhr.setRequestHeader("Authorization", "Bearer " + TWITTER_API_KEY + ":" + TWITTER_API_SECRET);
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Parse the response and extract the hashtags
      var response = JSON.parse(xhr.responseText);
      var hashtags = response.statuses.map(function(status) {
        return status.entities.hashtags;
      });
      callback(hashtags);
    }
  };
  xhr.send();
}
