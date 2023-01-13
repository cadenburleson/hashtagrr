window.onload = function () {
    // Get the tweet input element
    var tweetInput = document.getElementById("tweet-input");
    // Get the hashtag list element
    var hashtagList = document.getElementById("hashtag-list");

    // Listen for changes to the tweet input field
    tweetInput.addEventListener("input", function () {
        // Get the current tweet text
        var tweetText = tweetInput.value;

        // Send a message to the background script with the tweet text
        chrome.runtime.sendMessage({
            type: "get_hashtags",
            tweet: tweetText
        }, function (response) {
            // Handle the response from the background script
            var hashtagList = response.hashtag_list;
            // Clear the current hashtag list
            hashtagList.innerHTML = "";
            // Add the new hashtags to the list
            hashtagList.innerHTML = hashtagList.map(function (hashtag) {
                return "<li>" + hashtag + "</li>";
            }).join("");
        });
    });
};
