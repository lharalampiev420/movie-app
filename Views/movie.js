const url = new URL(window.location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = "http://127.0.0.1:3000/api/v1/reviews/";

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement("div");

// New review element
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><a href="#!" onclick="saveNewReview('new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`;
main.appendChild(div_new);

// Displays all reviews
const returnReviews = async function (url) {
  console.log(url + `movie/${movieId}`);
  let data = await fetch(url + `movie/${movieId}`);
  data = await data.json();
  console.log(data);
  data.reviews.forEach((review) => {
    const div_card = document.createElement("div");
    div_card.innerHTML = `
      <div class="row">
          <div class="column">
              <div class="card" id="${review._id}">
                  <p><strong>User: </strong> ${review.user}</p>
                  <p><strong>Review: </strong> ${review.review}</p>
                  <a href="#!" onclick="saveReview('new_review', 'new_user')">💾</a>
                  <a href="#!" onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> 
                  <a href="#!" onclick="deleteReview('${review._id}')">🗑</a>
                  </p>
              </div>
          </div>
      </div>
`;

    main.appendChild(div_card);
  });
};

const editReview = function (id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review" + id;
  const userInputId = "user" + id;

  element.innerHTML = `
              <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
              </p>
              <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><a href="#!" onclick="saveExistingReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
              </p>
  
  `;
};

const saveExistingReview = async function (reviewInputId, userInputId, id) {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (!user || !review) {
    alert("You must define both user and review !");
    return;
  }

  let data = await fetch(APILINK + id, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, review }),
  });

  data = await data.json();
  location.reload();
};

const saveNewReview = async function (reviewInputId, userInputId) {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (!user || !review) {
    alert("You must define both user and review !");
    return;
  }

  let data = await fetch(APILINK + "new", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, review, movieId }),
  });

  data = await data.json();
  location.reload();
};

const deleteReview = async function (id) {
  let res = await fetch(APILINK + id, {
    method: "DELETE",
  });
  res = await res.json;
  location.reload();
};

returnReviews(APILINK);
