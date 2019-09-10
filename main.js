if (localStorage.db) {
	var db = JSON.parse(localStorage.db);
}else{
	var db = [];
}

// S E L E C T O R S

let tbody1 = document.querySelector('#table1');
let tbody2 = document.querySelector('#table2');
let mainRow = document.querySelector('#mainRow');
let formRow = document.querySelector('#formRow');
let editDeleteRow = document.querySelector('#editDeleteRow');
let editRow = document.querySelector('#editRow');
let accountsBtn = document.querySelector('#accountsBtn');
let addAaccountBtn = document.querySelector('#addAccountBtn');
let editDeleteAccountBtn = document.querySelector('#editDeleteAccountBtn');
let editBtn = document.querySelector('#editBtn');
let formId = document.querySelector('#formId');
let formName = document.querySelector('#formName');
let formDeposit = document.querySelector('#formDeposit');
let formCCard = document.querySelector('#formCCard');
let saveBtn = document.querySelector('#saveBtn');
let saveEditBtn = document.querySelector('#saveEditBtn');
let editId = document.querySelector('#editId');
let editName = document.querySelector('#editName');
let editDeposit = document.querySelector('#editDeposit');
let editCCard = document.querySelector('#editCCard');

// E V E N T S

accountsBtn.addEventListener('click' , showMainRow);
addAccountBtn.addEventListener('click' , showFormRow);
editDeleteAccountBtn.addEventListener('click' , showEditDeleteRow);
saveBtn.addEventListener('click' , saveForm);
saveEditBtn.addEventListener('click' , saveEditRow);

createTable();

// F U N C T I O N S

function createTable(){
	setId();
	let text = "";
	for (let i = 0; i < db.length; i++) {
		text += '<tr>';
		text += '<td>' + db[i].id + '</td>';
		text += '<td>' + db[i].name + '</td>';
		text += '<td>' + db[i].deposit + '</td>';
		text += '<td>' + db[i].cCard + '</td>';
		text += '</tr>';
	}
	tbody1.innerHTML = text;
}

function showMainRow(){
	mainRow.style.display = 'block';
	formRow.style.display = 'none';
	editDeleteRow.style.display = 'none';
	editRow.style.display = 'none';
}

function showFormRow(){
	formId.value = db.length + 1;
	formName.value = "";
	formDeposit.value = "";
	formCCard.value = "";
	formRow.style.display = 'block';
	mainRow.style.display = 'none';
	editDeleteRow.style.display = 'none';
	editRow.style.display = 'none';
}

function showEditDeleteRow(){
	editDeleteRow.style.display = 'block';
	editRow.style.display = 'none';
	mainRow.style.display = 'none';
	formRow.style.display = 'none';
	createEditTable();
}

function createEditTable(){
	let text = "";
	for (let i = 0; i < db.length; i++) {
		text += '<tr>'
		text += '<td>' + db[i].id + '</td>';
		text += '<td>' + db[i].name + '</td>';
		text += '<td>' + db[i].deposit + '</td>';
		text += '<td>' + db[i].cCard + '</td>';
		text += '<td><button data-id="'+ i +'" class="btn btn-sm btn-info edit">Edit</button></td>'
		text += '<td><button id="'+ i +'"  class="btn btn-sm btn-dark delete">Delete</button></td>'
		text += '</tr>';
	}
	tbody2.innerHTML = text;
	let editBtns = document.querySelectorAll('.edit');
	let deleteBtns = document.querySelectorAll('.delete');
	for (let i = 0; i < editBtns.length; i++) {
		editBtns[i].addEventListener('click' , showEditRow);
		deleteBtns[i].addEventListener('click' , deleteAccount);
	}
}

function saveForm(){
	let idVal = formId.value;
	let nameVal = formName.value;
	let depostitVal = formDeposit.value;
	let cCardVal = formCCard.value;
	let newObj = {
		id : idVal,
		name : nameVal,
		deposit : depostitVal,
		cCard : cCardVal
	}
	db.push(newObj);
	localStorage.db = JSON.stringify(db);
	showMainRow();
	createTable();
}

function showEditRow(){
	// let id = this.className[this.className.length-1];
	// console.log(this.classList);
	// console.log(this.classList[this.classList.length-1]);

	
	let id = this.getAttribute('data-id');
	editRow.style.display = 'block';
	mainRow.style.display = 'none';
	formRow.style.display = 'none';
	editDeleteRow.style.display = 'none';
	editId.value = db[id].id;
	editName.value = db[id].name;
	editDeposit.value = db[id].deposit;
	editCCard.value = db[id].cCard;
}

function saveEditRow(){
	let idVal2 = editId.value;
	let nameVal2 = editName.value;
	let depostitVal2 = editDeposit.value;
	let cCardVal2 = editCCard.value;
	let newObj2 = {
		id : idVal2,
		name : nameVal2,
		deposit : depostitVal2,
		cCard : cCardVal2
	}
	// db.splice(editId.value -1 , 1 , newObj2);
	db[editId.value - 1] = newObj2;
	localStorage.db = JSON.stringify(db);
	showMainRow();
	createTable();
}

function deleteAccount(){
	db.splice(this.id , 1);
	localStorage.db = JSON.stringify(db);
	showMainRow();
	createTable();
}

function setId(){
	for (let i = 0; i < db.length; i++) {
		db[i].id = i + 1;
	}
}

