/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
By: Patrick  Leroux
Treehouse profile name: patleroux
******************************************/

/***
   Global variables
***/
const page = document.querySelector('.page');
const studentListUL = document.querySelector('.student-list');
const studentItemLI = studentListUL.children;
const paginationButtonUL = document.createElement('ul');
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';

const errorMsgDiv = document.createElement('div');
const errorMsgP = document.createElement('p');
errorMsgP.className = 'errorMsgP';
errorMsgP.innerText = 'No student found for : ';
errorMsgP.style.color = "red";
errorMsgP.style.display = 'none';
errorMsgDiv.appendChild(errorMsgP);
page.appendChild(errorMsgDiv);

const totalStudents = studentItemLI.length;
let currentPageNb = 1;
let nbStudentsPerPage =10;
const totalPages = Math.ceil(totalStudents / nbStudentsPerPage);
let currentPageCount = totalPages;
let searchFor = '';


function showPage() {
  // Activate all the student to fill up the current page.
  getStudents();

  // Generate the page links section.
  appendPageLinks();

  // add searchBar
  searchBar();
  }

/***
Function: getStudents
Get a specified number of student (nbStudentPerPage
the fill the current page
***/
function getStudents() {
  let lastIndex = currentPageNb * nbStudentsPerPage;
  let firstIndex = lastIndex - nbStudentsPerPage;
  console.log('searchFor = ' + searchFor);
  console.log('lastIndex = '+lastIndex);
  console.log('firstIndex = ' + firstIndex);

  if(searchFor === '') {
    for(i = 0; i < totalStudents; i++) {
      if (i >= firstIndex && i < lastIndex) {
        studentItemLI[i].style.display = '';
      } else {
        studentItemLI[i].style.display = 'none';
      }
    }
  } else {
    console.log('Houston we have a search for: ' + searchFor);
  }
}

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
function appendPageLinks() {
  // Remove all page link items
  while (paginationButtonUL.firstChild) {
    paginationButtonUL.removeChild(paginationButtonUL.firstChild);
  }
  // Refresh the page links with the current page activated.
  for (let i = 1; i <= currentPageCount; i++) {
    const pageLink = document.createElement('li');
    const a = document.createElement('a');

    if (i === currentPageNb) {
      a.className = "active";
    } else {
      a.className = "";
    }

    a.href="#";
    a.innerHTML = i;

    pageLink.appendChild(a);
    paginationButtonUL.appendChild(pageLink);
    paginationDiv.appendChild(paginationButtonUL);
    page.appendChild(paginationDiv);
  }
}

/*****************************************************/
/** Function: turnOffPageNumber                     **/
/** Small function create just to make code more    **/
/** readable                                        **/
/*****************************************************/
function turnOffPageNumber () {
  const a = document.querySelector('.active');
  a.className = '';
}

/*****************************************************/
/** Function: turnOnPageNumber                     **/
/** Small function create just to make code more    **/
/** readable                                        **/
/*****************************************************/
function turnOnPageNumber(a) {
  a.className = 'active';
}

/*****************************************************/
/** Lister on the ul for the 'click' event created  **/
/** by the bubbling effect                          **/
/*****************************************************/
paginationButtonUL.addEventListener('click', (e) => {
  const a = e.target;
  currentPageNb = Number(a.firstChild.data);
  console.log('currentPageNb = ' + currentPageNb );
  turnOffPageNumber();
  turnOnPageNumber(a);
  //getStudents(a.firstChild.data, nbStudentsPerPage)
  getStudents();
});

/*****************************************************/
/** Function: displayErrorMsg                       **/
/** Helper function to re-initalize the error msg   **/
/** with the search string and show the error       **/
/** message.                                        **/
/*****************************************************/
function displayErrorMsg(searchStr) {
  errorMsgP.innerText = 'No student found for : ' + searchStr;
  errorMsgP.style.display = '';
}

/*****************************************************/
/** Function: hideErrorMsg                          **/
/** Helper function to re-initalize the error and   **/
/** hide the error message.                         **/
/*****************************************************/
function hideErrorMsg() {
  errorMsgP.innerText = 'No student found for : ';
  errorMsgP.style.display = 'none';
}

/*****************************************************/
/** Function: searchStudentsName                    **/
/** Function that search, display the student names **/
/** that constains the search string and return the **/
/** number of student found.                        **/
/*****************************************************/
function searchStudentsName(searchStr) {
  const studentItemH3 = document.getElementsByTagName('h3');
  const studentName = [];
  let nbFound = 0;

  for(let i = 0; i < studentItemH3.length; i++) {
    studentName[i] = studentItemH3[i].innerHTML;
  }

  for(let i = 0; i < studentItemH3.length; i++) {
    let found = studentName[i].search(searchStr);
    if (found >= 0) {
      nbFound++;
      studentItemLI[i].style.display = '';
    } else {
      studentItemLI[i].style.display = 'none';
    }
  }

  return nbFound;
}

/*****************************************************/
/** Function: searchBar                             **/
/** Function implement the search functionnality.   **/
/*****************************************************/
function searchBar(){
  /*****************************************************/
  /** Build the search bar (input & button)           **/
  /*****************************************************/
  const pageHeader = document.querySelector('.page-header');
  const studentSearchDiv = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');

  studentSearchDiv.className = 'student-search';
  input.type = 'text';
  input.placeholder = 'Search for students...';
  button.textContent = 'Search';

  studentSearchDiv.appendChild(input);
  studentSearchDiv.appendChild(button);
  pageHeader.appendChild(studentSearchDiv);

  /*****************************************************/
  /** Event listener on : button                     **/
  /*****************************************************/
  button.addEventListener('click', (e) => {
    searchFor = input.value;
    input.value = '';

    hideErrorMsg();

    // Empty search box submitted.
    if(searchFor === '') {
      currentPageCount = totalPages;
      currentPageNb = 1;
      nbFound = nbStudentsPerPage;
//      getStudents();
//      appendPageLinks();
    } else {
      // Search for student names
      const nbFound = searchStudentsName(searchFor);

      console.log('nbFound = ' + nbFound);
      if (nbFound === 0){
        displayErrorMsg(searchFor);
      }
      currentPageNb = 1;
      currentPageCount = Math.ceil(nbFound / nbStudentsPerPage);
//      appendPageLinks();
    } // End of searchFor === ''
    getStudents();
    appendPageLinks();

  }); // End of button.addEventListener
} // End of searchBar



// showPage
showPage();
