const myNotes = document.querySelector('.my-notes')
const noteView = document.querySelector('.note-view')
const newNote = document.querySelector('.new-note')

const noteForm = (title = '', noteText = '') => {
	return `<div class="h-100 new-note-wrapper">
						<div class="new-note-header d-flex align-items-center">														
								<label
										for="note-title"
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
									Save</button
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
																	<div><small>3 days ago</small></div>
																	<div class="d-flex w-100 justify-content-between">																	  
																		<h5 class="mb-1">${title}</h5>																
															    </div>
    													    <p class="mb-1 text-truncate" style="max-width: 200px;">${noteText}</p>    													    
  														</div>`)
	})
	myNotes.innerHTML = listGroupItems
	const noteItems = document.querySelectorAll('.note-item')
	noteItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			let id = e.target.id
			if (!id) {
				id = e.target.parentElement.id || e.target.parentElement.parentElement.id
			}
			getNote(id)
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
														<button class="btn btn-info btn-sm edit-button">Edit</button>
														<button class="btn btn-danger btn-sm delete-button">Delete</button>
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
