const myNotes = document.querySelector('.my-notes')
const newNote = document.querySelector('.new-note')
const confirmModal = new bootstrap.Modal('#confirmModal', {})
const searchInput = document.querySelector('#search')
const url = '/api/notes'

const renderNoteForm = (title = '', noteText = '', crudOp = 'post', id) => {
	const noteView = document.querySelector('.note-view')
	noteView.innerHTML = `
			<div class="h-100 new-note-wrapper" data-crud-op="${crudOp}">
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
				<div class="border border-1 rounded-3 p-3 new-note-body">															
						<label
							for="note-text"
							class="form-label fw-semibold fs-4 d-none"
							>Note Text</label
						>
						<textarea
							class="form-control fs-4"
							id="note-text"
							placeholder="Start writing your note..."									
						>${noteText}</textarea>
				</div>													
			</div>`.trim()

	const saveButton = document.querySelector('.save-button')
	saveButton.addEventListener('click', () => {
		const newNoteWrapper = document.querySelector('.new-note-wrapper')
		const noteTitleInput = document.querySelector('#note-title-input')
		const noteText = document.querySelector('#note-text')

		if (noteTitleInput.value.length === 0 || noteText.value.length === 0) {
			console.log('No new note to save')
			return
		}
		const newNote = { title: noteTitleInput.value, noteText: noteText.value }

		handleSave(newNote, newNoteWrapper.dataset.crudOp, id)

		noteTitleInput.value = ''
		noteText.value = ''
	})
}

renderNoteForm()

const renderNote = (note) => {
	if (!note) return
	const noteView = document.querySelector('.note-view')
	const { title, noteText } = note
	const currentNote = `									 
			<div class="d-flex justify-content-between">
			<h2 class="mb-3 fs-1 fw-bold">${title}</h2>
				<div class="d-flex gap-1">																	  
					<button class="btn btn-info btn-sm edit-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l263-262 123 122-263 263H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
					<button class="btn btn-delete btn-sm delete-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
				</div>
			</div>
			<p class="fs-5">${noteText}</p>
		`.trim()

	noteView.innerHTML = currentNote

	const deleteButton = document.querySelector('.delete-button')
	deleteButton.addEventListener('click', () => {
		confirmModal.show()
	})

	const confirm = document.querySelector('.confirm')

	const confirmDelete = () => {
		handleDelete(note)
		confirmModal.hide()
		confirm.removeEventListener('click', confirmDelete)
	}
	confirm.addEventListener('click', confirmDelete)
}

// Delete notes
const handleDelete = async (note) => {
	const { id } = note
	console.log(id)
	try {
		await fetch(`${url}/${id}`, { method: 'DELETE' })
		getNotes()
		renderMostRecentNote()
	} catch (error) {
		console.log(error.message)
	}
}

// Get all notes
const getNotes = async (re = RegExp('')) => {
	try {
		const response = await fetch(url)
		if (response.ok) {
			const data = await response.json()
			data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
			const filteredData = data.filter((item) => re.test(item.title))
			renderNotes(filteredData)
		}
	} catch (error) {
		console.log(error)
	}
}

// New note event handler
newNote.addEventListener('click', () => {
	renderNoteForm()
	getNotes()
	const noteTitleInput = document.querySelector('#note-title-input')
	noteTitleInput.focus()
})

// Render notes
const renderNotes = (data) => {
	myNotes.innerHTML = ''
	let listGroupItems = ''
	if (data.length === 0) {
		myNotes.innerHTML = `<div class="text-center">No Notes</div>`
		return
	}
	data.forEach((item) => {
		const { title, noteText, id, updatedAt } = item
		return (listGroupItems += `
			<div class="list-group-item list-group-item-action rounded-3 note-item" aria-current="true" id="${id}">
				<h5 class="mb-1 text-truncate fw-bolder" data-name="title" style"width: 300px">${title}</h5>
				<p class="mb-1 text-truncate fs-6 fw-lighter d-none d-md-block" data-name="note-text" style="width: 300px">${noteText}</p>
				<small data-name="date" class="badge text-bg-light float-end d-none d-md-block">${dateFns.formatDistanceToNowStrict(updatedAt, { addSuffix: true })}</small>
			</div>`.trim())
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

// Get one note
const getNote = async (id) => {
	const response = await fetch(`${url}/${id}`)
	if (response.ok) {
		const note = await response.json()

		renderNote(note)
		handleEdit(note)
	}
}

// Render most recent note
const renderMostRecentNote = async () => {
	const response = await fetch(url)
	let mostRecentNote = null
	if (response.ok) {
		const data = await response.json()
		mostRecentNote = data[data.length - 1]
		renderNote(mostRecentNote)
		handleEdit(mostRecentNote)
	}

	setTimeout(() => {
		const mostRecent = document.getElementById(mostRecentNote.id)
		mostRecent.classList.add('active')
	}, 500)
}

renderMostRecentNote()

// Edit notes
const handleEdit = (note) => {
	if (!note) return
	const editButton = document.querySelector('.edit-button')
	editButton.addEventListener('click', () => {
		const { title, noteText, id } = note
		renderNoteForm(title, noteText, 'put', id)
		const noteTitleInput = document.querySelector('#note-title-input')
		noteTitleInput.focus()
	})
}

// Save notes
const handleSave = async (note, crudOp, id) => {
	if (crudOp === 'post') {
		try {
			await fetch(url, { method: 'POST', body: JSON.stringify(note), headers: { 'Content-Type': 'application/json' } })
			getNotes()
			renderMostRecentNote()
		} catch (error) {
			console.log(error)
		}
	} else {
		try {
			await fetch(`${url}/${id}`, { method: 'PUT', body: JSON.stringify(note), headers: { 'Content-Type': 'application/json' } })
			getNotes()
			renderMostRecentNote()
		} catch (error) {
			console.log(error)
		}
	}
}

const handleSearch = () => {
	searchInput.addEventListener('keyup', (e) => {
		const { value } = e.target
		const re = RegExp(value)
		getNotes(re)
	})
}

getNotes()
handleSearch()
