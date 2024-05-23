let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// Check if the current page is the notes page
if (window.location.pathname === '/notes') {
  // Select elements specific to the notes page
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Function to show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Function to hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// Object to keep track of the currently active note in the text area
let activeNote = {};
// Define the getNotes function to fetch all notes from the server, to be used in the code where notes need to be fetched from the server. Ex: to populate a list of notes when the notes page is loaded
const getNotes = () =>
  fetch('/api/notes', { // Powerful way to make HTTP requests from the browser to a server. It returns a Promise that resolves to the response of the request
    method: 'GET', // This specifies that the request method is a GET, which is used to retrieve data from the server typically without altering it
    headers: { // This sets the HTTP headers for the request. 
      'Content-Type': 'application/json' // This header tells the server that the client expects the response content to be in JSON format. Although it's not strictly necessary, it's good to ensure proper content negotiation
    }
  });

// Define function to save a new note to the server with a parameter of 'note', which is the note object to be saved.
// The serer processes the request, adding the new note to a database and returning a response.
const saveNote = (note) =>
  fetch('/api/notes', { // Makes a fetch POST request to the '/api/notes' endpoint. Expected to accept new note data and save it on the server.
    method: 'POST', // Specifies that it will be a POST request method, which is used to send data to the server to create a new resource
    headers: { // Headers are a component of a request message that contain metadata about the message or the message body. In this case, it'sused to specify the format of the data being sent in the request body
      'Content-Type': 'application/json' // Specifies the content type as JSON. By doing this, the server knows how to interpret the incoming data.
    },
    body: JSON.stringify(note) // Specifies the body of the POST request. Converts the 'note' object into a JSON string. This is neccessary because the fetch api requires the body of the request to be a string when sending JSON data.
  });


// Function to delete a note from the server by its ID
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });


// Function to render the currently active note in the textarea
const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);
  // If there is an active note, display its details
  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  // If there is no active note, clear the form for a new note
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

// Handle the save note button click
const handleNoteSave = () => {
  // Extract the title and text from the form fields and assign them to the newNote variable
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  // Save the new note to the server by running it in the saveNote function
  saveNote(newNote).then(() => {
    getAndRenderNotes(); // Then fetch and render the updated list of notes
    renderActiveNote(); // Then clear the active note form
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
const handleRenderBtns = () => {
  show(clearBtn);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  // The response body containing note data is parsed as JSON This returns a Promise that resolves to the parsed JSON data. 
  // The await ensures that the function waits for the Promise to resolve before proceeding.
  let jsonNotes = await notes.json();

  // If the current page is the notes page, the existing note list in the UI is cleared.
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = '')); // This is done by setting the innerHTML of each element in the noteList to an empty string
  }
  // Initialize an empty array to store the list item elements for each note
  let noteListItems = [];

  // Returns HTML element with or without a delete button. It takes text (the text content of the note) and delbtn (a boolean indicating whether or not to include a delete button)
  const createLi = (text, delBtn = true) => {
    
    const liEl = document.createElement('li'); // Creates a list item element for each note
    liEl.classList.add('list-group-item'); // Assigned and styled by the CSS class 'list-group-item'

    const spanEl = document.createElement('span'); // A span element is created to display the note title text
    spanEl.classList.add('list-item-title'); // Class is added for styling
    spanEl.innerText = text; // Adds the text to the element
    spanEl.addEventListener('click', handleNoteView); // Add event listener to the note title to handle clicks

    liEl.append(spanEl); // Adds the list element to the span element
    
    // If delBtn is true 
    if (delBtn) {
      const delBtnEl = document.createElement('i'); // A delete button represented by an <i> element is added
      delBtnEl.classList.add( // With specific css class and appended to the list item
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete); // Adds event listener to delete button to handle deleting the note

      liEl.append(delBtnEl);
    }

    return liEl; // The created list item element is returned
  };

 
  if (jsonNotes.length === 0) {  // If there are no saved notes
    noteListItems.push(createLi('No saved Notes', false)); // Display a placeholder
  }

  // This loop iterates over each element in the jsonNotes array, which contains the pased JSON data representing each note.
  jsonNotes.forEach((note) => {
    
    const li = createLi(note.title); // For each note, create a list item element with the note title as the argument. This creates a list item with the note title text and optionally a delete button, based on the implementation of the 'createLi' function.
    li.dataset.note = JSON.stringify(note);  // Custom data attributes are used to store additional data with HTML elements. The entire note object is stored as a JSON string in the data-note attribute of the list item as a JSON string. 

    noteListItems.push(li); // The created list item is then pushed into the noteListItems array. This stores each note.
  });

  if (window.location.pathname === '/notes') { 
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') { // Check if the current page is the notes page
  // If is is the notes page, add ecent listeners to relevant buttons and form fields
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);
}
// Fetch and render notes when the page loads
getAndRenderNotes();
