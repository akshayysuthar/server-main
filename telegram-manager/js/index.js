const firestore = firebase.firestore();
const db = firestore.collection("telegram-post");

function openPostPage(postId) {
  // redirect to post page
  window.location.href = `post.html?id=${postId}`;
}
function copyText() {
  const range = document.createRange(); // Create a range object
  range.selectNodeContents(document.getElementById("text")); // Select the contents of the p tag
  const selection = window.getSelection(); // Get the current selection object
  selection.removeAllRanges(); // Remove any existing selections
  selection.addRange(range); // Add the new range to the selection
  document.execCommand("copy"); // Copy the selected text to the clipboard
  alert("Text copied!"); // Show a message to the user
}

db.orderBy("timestamp", "desc")
  // .limit(7)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var post = doc.data();
      // display movie in homepage
      document.getElementById("post").innerHTML += `
                  
        <li>
        <div class="movie-card" onclick="openPostPage('${doc.id}')">
            <figure class="card-banner">
              <img width="200"
                src="${post.imageUrl}"
                alt="${doc.data().title}"
              />
            </figure>
          <div class="title-wrapper">
              <h3 class="card-title">${doc.data().title}</h3>
          </div>
        </div>
      </li>
      `;
    });
  });


