showNotes(); //shownotes called here to display notes even after reloading. without this notes doesnt display after reloading

//if user adds a note, add it to local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
	let addTxt = document.getElementById("addTxt");
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	} 
    else {
		notesObj = JSON.parse(notes);
	}
	notesObj.push(addTxt.value);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addTxt.value = ""; //setting text area blank once it stores in local storage so it doesnt stay as written
	// console.log(notesObj);
    addTitle();
	showNotes();
});

//function to show elements from local storage
function showNotes() {
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	} 
    else {
		notesObj = JSON.parse(notes);
	}

    let title = localStorage.getItem("title");
	if (title == null) {
		titleObj = [];
	} 
    else {
		titleObj = JSON.parse(title);
	}

	let html = "";
	notesObj.forEach(function (element, index) {      
		html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">        
        <h5 id="noteTitle" class="card-title"> ${titleObj[index]} ${index + 1}</h5>
        <p class="card-text">${element}</p>
        <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary mb-1">Delete Note</button>
        <button id =${index} onclick="markImp(this.id)" class="btn btn-primary mt-1 important">Mark Important</button>
        </div>
        </div>`;
	});

    
	let notesElem = document.getElementById("notes");
	if (notesObj.length != 0) {
		notesElem.innerHTML = html;
	} else {
		notesElem.innerHTML = `Nothing to show.. "Add a Note!"`;
	}
}

//function to delete a note
function deleteNote(index) {
	// console.log("Deleting", index);

	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}

	notesObj.splice(index, 1);
	localStorage.setItem("notes", JSON.stringify(notesObj));

    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
	} 
    else {
        titleObj = JSON.parse(title);
	}

    titleObj.splice(index, 1);
	localStorage.setItem("title", JSON.stringify(titleObj));

	showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
	let inputVal = search.value.toLowerCase();
	// console.log("input event fired", inputVal);

	let noteCards = document.getElementsByClassName("noteCard");
	Array.from(noteCards).forEach(function (element) {
		let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
		let titleTxt = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
		if (cardTxt.includes(inputVal) || titleTxt.includes(inputVal)) {
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
		// console.log(cardTxt);
	});

});

function markImp(index){

	let htag = document.createElement("h4");
	htag.innerHTML = `<a id="mark" class="mx-3 my-3 badge badge-warning">Important</a>`;
	console.log(index, htag);
	let noteCard= document.getElementsByClassName("noteCard")
	let card = Array.from(noteCard)[index];
	console.log(card);
	card.insertAdjacentElement("afterbegin",htag);
	
	
}


function addTitle(){
    let titleTxt = document.getElementById("titleTxt");
    let inputVal = titleTxt.value;
    
    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
	} 
    else {
        titleObj = JSON.parse(title);
	}
    titleObj.push(inputVal);
	localStorage.setItem("title", JSON.stringify(titleObj));
    titleTxt.value = "";
    // console.log(titleObj);
}



/*
1. add title for notes
2. add mark as important
3. asking for confirmation before deleting important marked note
4. improve search
5. search suggestions for notes title
6. form validations before adding note
7. Editable notes
8. Import - export notes
9. separate notes by user
10. sync and host to web server
*/ 