const myNotes = document.querySelector('.my-notes')
const noteView = document.querySelector('.note-view')
const newNote = document.querySelector('.new-note')

const noteForm = (title = '', noteText = '') => {
	return `<div class="h-100 new-note-wrapper">
						<div class="new-note-header d-flex align-items-center">
								<label
										for="note-title-input"
										class="form-label fw-semibold fs-4 d-none"
								>Title</label
								>		
								<input
									type="text"
									class="form-control fs-3 fw-bolder flex-grow-1"
									id="note-title-input"
									placeholder="Untitled"
									value="${title}"
								/>															
								<button
									type="button"
									class="btn btn-md btn-success save-button flex-grow-0"
								>
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M840-680v560H120v-720h560l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg> Save</button
								>
						</div>
						<div class="border border-1 rounded-3 p-3">															
								<label
									for="note-text"
									class="form-label fw-semibold fs-4 d-none"
									>Note Text</label
								>
								<textarea
									class="form-control fs-4"
									id="note-text"
									placeholder="Start writing your note..."
									rows="16"
									
								>${noteText}</textarea>
						</div>													
					</div>`
}

newNote.addEventListener('click', () => {
	noteView.innerHTML = ''
	noteView.innerHTML = noteForm()
	const noteTitleInput = document.querySelector('#note-title-input')
	noteTitleInput.focus()
})

const getNotes = async () => {
	const url = 'http://localhost:5000/api/notes'
	try {
		const response = await fetch(url)
		if (response.ok) {
			const data = await response.json()
			renderNotes(data)
		}
	} catch (error) {
		console.log(error)
	}
}

const renderNotes = (data) => {
	myNotes.innerHTML = ''
	let listGroupItems = ''
	data.forEach((item) => {
		const { title, noteText, id } = item
		return (listGroupItems += `<div class="list-group-item list-group-item-action rounded-3 note-item" aria-current="true" id="${id}">
																	<small data-name="date">3 days ago</small>																																  
																	<h5 class="mb-1" data-name="title">${title}</h5>																		
    													    <p class="mb-1 text-truncate" style="max-width: 200px;" data-name="note-text">${noteText}</p>    													    
  														 </div>`)
	})
	myNotes.innerHTML = listGroupItems
	const noteItems = document.querySelectorAll('.note-item')
	noteItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			let target = e.target
			if (e.target.dataset.name === 'title' || e.target.dataset.name === 'date' || e.target.dataset.name === 'note-text') {
				target = e.target.parentElement
			}
			const childNodes = target.parentNode.childNodes
			childNodes.forEach((node) => {
				node.classList.remove('active')
			})
			target.classList.add('active')
			getNote(target.id)
		})
	})
}

const getNote = async (id) => {
	const url = `http://localhost:5000/api/notes/${id}`
	const response = await fetch(url)
	if (response.ok) {
		const note = await response.json()
		renderNote(note)
		handleDelete(note)
		handleEdit(note)
	}
}

const handleEdit = (note) => {
	const editButton = document.querySelector('.edit-button')
	editButton.addEventListener('click', () => {
		const { title, noteText, id } = note
		noteView.innerHTML = noteForm(title, noteText)
		const noteTitleInput = document.querySelector('#note-title-input')
		noteTitleInput.focus()
		getNewNote('put', id)
	})
}
const handleDelete = (note) => {
	const { id } = note
	const deleteButton = document.querySelector('.delete-button')
	deleteButton.addEventListener('click', async () => {
		const url = `http://localhost:5000/api/notes/${id}`
		try {
			await fetch(url, { method: 'DELETE' })
			noteView.innerHTML = noteForm()
			getNotes()
		} catch (error) {
			console.log(error.message)
		}
	})
}

const renderNote = (note) => {
	const { title, noteText } = note
	const currentNote = `									 
											 <div class="d-flex justify-content-between">
											    <h2 class="mb-3">${title}</h2>
													<div class="d-flex gap-1">																	  
														<button class="btn btn-info btn-sm edit-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l263-262 123 122-263 263H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
														<button class="btn btn-delete btn-sm delete-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
													</div>
											 </div>
											 <p class="fs-5">${noteText}</p>
											`

	noteView.innerHTML = currentNote
}

const getNewNote = (operation = 'create', id) => {
	const noteTitleInput = document.querySelector('#note-title-input')
	const noteText = document.querySelector('#note-text')
	const saveButton = document.querySelector('.save-button')

	saveButton.addEventListener('click', (e) => {
		if (noteTitleInput.value.length === 0 || noteText.value.length === 0) {
			console.log('No new note to save')
			return
		}
		const newNote = { title: noteTitleInput.value, noteText: noteText.value }
		handleSave(newNote, operation, id)
	})
}

const handleSave = async (note, operation, id) => {
	if (operation === 'create') {
		const url = `http://localhost:5000/api/notes`
		try {
			await fetch(url, { method: 'POST', body: JSON.stringify(note), headers: { 'Content-Type': 'application/json' } })
			getNotes()
			noteView.innerHTML = noteForm()
		} catch (error) {
			console.log(error)
		}
	} else {
		const url = `http://localhost:5000/api/notes/${id}`
		try {
			await fetch(url, { method: 'PUT', body: JSON.stringify(note), headers: { 'Content-Type': 'application/json' } })
			getNotes()
			noteView.innerHTML = noteForm()
		} catch (error) {
			console.log(error)
		}
	}
}

const main = () => {
	getNotes()
	noteView.innerHTML = noteForm()
	getNewNote()
}

main()
