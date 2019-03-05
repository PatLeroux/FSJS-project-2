/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const page = document.querySelector('.page');
const studentListUL = document.querySelector('.student-list');
const studentItemLI = studentListUL.children;
let paginationButtonUL = document.createElement('ul');
let paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';

const totalStudents = studentItemLI.length;
let currentPageNb = 1;
let nbStudentsPerPage = 10;
const totalPage = Math.ceil(totalStudents / nbStudentsPerPage);




/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/
function showPage() {
  // Activate all the student to fill up the current page.
  getStudents();

  // Generate the page links section.
  appendPageLinks(currentPageNb, totalPage);


  //addSearchBar();
  }

/***
Function: getStudents
Get a specified number of student (nbStudentPerPage
the fill the current pag
***/
function getStudents() {
  let lastIndex = currentPageNb * nbStudentsPerPage;
  let firstIndex = lastIndex - nbStudentsPerPage;

  for(i = 0; i < totalStudents; i++) {
    if (i >= firstIndex && i < lastIndex) {
      studentItemLI[i].style.display = '';
    } else {
      studentItemLI[i].style.display = 'none';
    }
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
  for (let i = 1; i <= totalPage; i++) {
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
  // Get the students for the current page
  getStudents();
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
  getStudents(a.firstChild.data, nbStudentsPerPage)
});




// Remember to delete the comments that came with this file, and replace them with your own code comments.
showPage();
