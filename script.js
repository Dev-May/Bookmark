var bookmarkName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var xMark = document.getElementById("xMark");
var errorPopup = document.getElementById("errorPopup");

var bookmarksList = [];

if (localStorage.getItem("Bookmarks") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("Bookmarks"));
  displayBookmark(bookmarksList);
}

function addBookmark() {
  if (validateBookmarkName() && validateSiteURL()) {
    errorPopup.classList.add("d-none");
    var bookmark = {
      bookmarkName: bookmarkName.value,
      siteURL: siteURL.value,
    };

    bookmarksList.push(bookmark);
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarksList));

    displayBookmark(bookmarksList);
    clearForm();
  } else {
    errorPopup.classList.remove("d-none");
  }
}

function clearForm() {
  bookmarkName.value = null;
  siteURL.value = null;
}

function displayBookmark(arr) {
  var bookmarksPreview = ``;
  for (var i = 0; i < arr.length; i++) {
    bookmarksPreview += `
    <div class="row py-2">
            <div class="col-3">${i + 1}</div>
            <div class="col-3">${arr[i].bookmarkName}</div>
            <div class="col-3">
            <button
            id="visitBtn"
            class="visit btn text-white rounded-2"
          ><i class="fa-solid fa-eye pe-2"></i>
        <a class="text-decoration-none text-white" target="_blank" href="${
          arr[i].siteURL
        }">Visit</a>
          </button>
            </div>
            <div class="col-3">
            <button onclick='deleteBookmark(${i})'
            id="deleteBtn"
            class="delete btn text-white bg-danger rounded-2"
          ><i class="fas fa-trash pe-2"></i>
            Delete
          </button>
            </div>
          </div>
    `;
  }

  document.getElementById("bookmarksPreview").innerHTML = bookmarksPreview;
}

function deleteBookmark(ind) {
  bookmarksList.splice(ind, 1);
  displayBookmark(bookmarksList);
  localStorage.setItem("Bookmarks", JSON.stringify(bookmarksList));
  console.log(bookmarksList);
}

function validateBookmarkName() {
  var regex = /^.{3,}$/;
  if (regex.test(bookmarkName.value)) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
    return false;
  }
}

function validateSiteURL() {
  var regex = /^https:\/\/[a-zA-Z0-9.-]+(\/[a-zA-Z0-9_-]*)*\/?$/;
  if (regex.test(siteURL.value)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    return true;
  } else {
    siteURL.classList.remove("is-valid");
    siteURL.classList.add("is-invalid");
    return false;
  }
}

function closeLightBox() {
  errorPopup.classList.add("d-none");
}

xMark.addEventListener("click", function () {
  closeLightBox();
});

errorPopup.addEventListener("click", function () {
  closeLightBox();
});
