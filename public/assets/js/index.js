const myNotes = document.querySelector('.my-notes')
const newNote = document.querySelector('.new-note')
const confirmModal = new bootstrap.Modal('#confirmModal', {})

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

const getNotes = async () => {
	const url = 'http://localhost:5000/api/notes'
	try {
		const response = await fetch(url)
		if (response.ok) {
			const data = await response.json()
			data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
			renderNotes(data)
		}
	} catch (error) {
		console.log(error)
	}
}

newNote.addEventListener('click', () => {
	renderNoteForm()
	getNotes()
	const noteTitleInput = document.querySelector('#note-title-input')
	noteTitleInput.focus()
})

const renderNotes = (data) => {
	myNotes.innerHTML = ''
	let listGroupItems = ''
	data.forEach((item) => {
		const { title, noteText, id, updatedAt } = item
		return (listGroupItems += `
			<div class="list-group-item list-group-item-action rounded-3 note-item" aria-current="true" id="${id}">
				<h5 class="mb-1 text-truncate fw-bolder" data-name="title">${title}</h5>
				<p class="mb-1 text-truncate fs-6 fw-lighter" data-name="note-text">${noteText}</p>
				<small data-name="date" class="badge text-bg-light float-end">${dateFns.formatDistanceToNowStrict(updatedAt, { addSuffix: true })}</small>
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

const getNote = async (id) => {
	const url = `http://localhost:5000/api/notes/${id}`
	const response = await fetch(url)
	if (response.ok) {
		const note = await response.json()

		renderNote(note)
		handleEdit(note)
	}
}

const renderMostRecentNote = async () => {
	const url = `http://localhost:5000/api/notes/`
	const response = await fetch(url)
	let mostRecentNote = null
	if (response.ok) {
		const data = await response.json()
		mostRecentNote = data[data.length - 1]
		renderNote(mostRecentNote)
		handleEdit(mostRecentNote)
	}

	observer.observe(document.body, { childList: true, subtree: true })
}

renderMostRecentNote()

const observer = new MutationObserver(() => {
	const mostRecentNoteElement = document.querySelector('.my-notes').firstChild
	if (mostRecentNoteElement) {
		mostRecentNoteElement.classList.add('active')
		observer.disconnect()
	}
})

const handleEdit = (note) => {
	const editButton = document.querySelector('.edit-button')
	editButton.addEventListener('click', () => {
		const { title, noteText, id } = note
		renderNoteForm(title, noteText, 'put', id)
		const noteTitleInput = document.querySelector('#note-title-input')
		noteTitleInput.focus()
	})
}

const handleDelete = async (note) => {
	const { id } = note
	const url = `http://localhost:5000/api/notes/${id}`

	try {
		await fetch(url, { method: 'DELETE' })
		getNotes()
		renderNoteForm()
	} catch (error) {
		console.log(error.message)
	}
}

const handleSave = async (note, crudOp, id) => {
	if (crudOp === 'post') {
		const url = `http://localhost:5000/api/notes`
		try {
			await fetch(url, { method: 'POST', body: JSON.stringify(note), headers: { 'Content-Type': 'application/json' } })
			getNotes()
		} catch (error) {
			console.log(error)
		}
	} else {
		const url = `http://localhost:5000/api/notes/${id}`
		try {
			await fetch(url, { method: 'PUT', body: JSON.stringify(note), headers: { 'Content-Type': 'application/json' } })
			getNotes()
			renderNoteForm()
		} catch (error) {
			console.log(error)
		}
	}
}

getNotes()
