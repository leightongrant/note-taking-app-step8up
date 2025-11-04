const myNotes = document.querySelector('.my-notes')
const noteView = document.querySelector('.note-view')
const newNote = document.querySelector('.new-note')

const newNoteContent = `<div class="h-100 new-note-wrapper">
									<div class="new-note-header">
										<h2 class="new-note-title">Untitled</h2>
										<button
											type="button"
											class="btn btn-md btn-success"
										>
											Save</button
										><button
											type="button"
											class="btn btn-md btn-outline-danger"
										>
											Delete
										</button>
									</div>
									<div class="border border-1 rounded-3 p-3">
										<div class="mb-3">
											<label
												for="note-title"
												class="form-label fw-semibold fs-4"
												>Title</label
											>
											<input
												type="email"
												class="form-control"
												id="note-title"
												placeholder="Untitled"
											/>
										</div>
										<div class="mb-3">
											<label
												for="note-text"
												class="form-label fw-semibold fs-4"
												>Note Text</label
											>
											<textarea
												class="form-control"
												id="note-text"
												rows="16"
											></textarea>
										</div>
									</div>
								</div>`

newNote.addEventListener('click', () => {
	noteView.innerHTML = ''
	noteView.innerHTML = newNoteContent
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
															<div class="d-flex w-100 justify-content-between">
																<h5 class="mb-1">${title}</h5>																
															</div>
    													<p class="mb-1 text-truncate" style="max-width: 200px;">${noteText}</p>
    													<small>3 days ago</small>
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
	}
}

const renderNote = (note) => {
	const { title, noteText } = note
	const currentNote = `<h2>${title}</h2>
											 <p>${noteText}</p>
											`

	noteView.innerHTML = currentNote
}

const main = () => {
	getNotes()
	noteView.innerHTML = newNoteContent
}

main()
