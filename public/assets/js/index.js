const myNotes = document.querySelector('.my-notes')
const noteView = document.querySelector('.note-view')

const url = 'http://localhost:5000/api/notes'
const getNotes = async (url) => {
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
																<small>3 days ago</small>
															</div>
    													<p class="mb-1 text-truncate" style="max-width: 200px;">${noteText}</p>
    													<small>And some small print.</small>
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

getNotes(url)
