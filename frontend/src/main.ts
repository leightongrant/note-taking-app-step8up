const myNotes = document.querySelector<HTMLDivElement>('.my-notes')
const newNote = document.querySelector<HTMLDivElement>('.new-note')
const confirmModal = new bootstrap.Modal('#confirmModal', {})
const searchInput = document.querySelector<HTMLInputElement>('#search')

const url = import.meta.env.VITE_ENDPOINT || '/api/notes'

// Types
type RenderNoteForm = (
  title?: string,
  noteText?: string,
  crudOp?: string,
  id?: string
) => void

type Note = {
  id: string
  title: string
  noteText: string
  createdAt: Date
  updatedAt: Date
}

type NewNote = {
  title: string
  noteText: string
}

let selectedNote: any = null

const renderNoteForm: RenderNoteForm = (
  title = '',
  noteText = '',
  crudOp = 'post',
  id
) => {
  const noteView = document.querySelector<HTMLDivElement>('.note-view')

  if (!noteView) {
    throw new Error('Unable to render note')
  }

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

  const saveButton = document.querySelector<HTMLButtonElement>('.save-button')

  saveButton?.addEventListener('click', () => {
    const newNoteWrapper =
      document.querySelector<HTMLDivElement>('.new-note-wrapper')
    const noteTitleInput =
      document.querySelector<HTMLInputElement>('#note-title-input')
    const noteText = document.querySelector<HTMLTextAreaElement>('#note-text')

    if (!noteTitleInput || !noteText || !newNoteWrapper) {
      throw new Error('Unable to save note')
    }

    if (noteTitleInput.value.length === 0 || noteText.value.length === 0) {
      console.log('No new note to save')
      return
    }
    const newNote = { title: noteTitleInput.value, noteText: noteText.value }

    if (!newNoteWrapper) {
      throw new Error('Unable to save note')
    }
    const { crudOp } = newNoteWrapper.dataset

    if (!crudOp || !id) {
      throw new Error('Unable to save note')
    }

    handleSave(newNote, crudOp, id)

    noteTitleInput.value = ''
    noteText.value = ''
  })
}

renderNoteForm()

const renderNote = (note: Note) => {
  if (!note) {
    throw new Error('Unable to render note')
  }
  const noteView = document.querySelector<HTMLDivElement>('.note-view')
  const { title, noteText } = note
  const currentNote = `
			<div class="d-flex justify-content-between">
			<h2 class="mb-3 fs-1 fw-bold">${title}</h2>
				<div class="d-flex gap-1">
					<button class="btn btn-info btn-sm edit-button" title="Edit Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l263-262 123 122-263 263H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
					<button class="btn btn-delete btn-sm delete-button" title="Delete Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
				</div>
			</div>
			<p class="fs-5">${noteText}</p>
		`.trim()

  if (!noteView) {
    throw new Error('Cannot set note')
  }

  noteView.innerHTML = currentNote

  const deleteButton =
    document.querySelector<HTMLButtonElement>('.delete-button')

  deleteButton?.addEventListener('click', () => {
    selectedNote = note
    confirmModal.show()
  })
}

// Confirm
const confirmBtn = document.querySelector<HTMLButtonElement>('#confirm')

const confirmDelete = () => {
  handleDelete(selectedNote)
  confirmModal.hide()
}

confirmBtn?.addEventListener('click', confirmDelete)

// Delete notes
const handleDelete = async (note: Note) => {
  const { id } = note
  console.log(id)
  try {
    await fetch(`${url}/${id}`, { method: 'DELETE' })
    await getNotes()
    await renderMostRecentNote()
  } catch (error) {
    console.log(error)
  }
}

// Get all notes
const getNotes = async (re = RegExp('')) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch notes')
    }

    const data = await response.json()

    data.sort((a: Note, b: Note) => {
      const bDate = new Date(b.updatedAt).getTime()
      const aDate = new Date(a.updatedAt).getTime()

      return bDate - aDate
    })

    const filteredData = data.filter((note: Note) => re.test(note.title))
    renderNotes(filteredData)
  } catch (error) {
    console.log('Error', error)
  }
}

// New note event handler
newNote?.addEventListener('click', async () => {
  renderNoteForm()
  await getNotes()
  const noteTitleInput =
    document.querySelector<HTMLInputElement>('#note-title-input')
  noteTitleInput?.focus()
})

// Render notes
const renderNotes = (data: Note[]) => {
  if (!myNotes) {
    throw new Error('myNotes is not defined')
  }
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
  const noteItems = document.querySelectorAll<HTMLDivElement>('.note-item')
  noteItems.forEach((item) => {
    item.addEventListener('click', (e: PointerEvent) => {
      let clickedTarget = e.target as HTMLElement
      let primaryTarget = e.target as HTMLDivElement

      if (
        clickedTarget.dataset.name === 'title' ||
        clickedTarget.dataset.name === 'date' ||
        clickedTarget.dataset.name === 'note-text'
      ) {
        primaryTarget = clickedTarget.parentElement as HTMLDivElement
      }

      const childNodes = primaryTarget.parentNode
        ?.childNodes as NodeListOf<HTMLDivElement>

      childNodes.forEach((node: HTMLDivElement) => {
        node.classList.remove('active')
      })

      primaryTarget.classList.add('active')
      getNote(primaryTarget.id)
    })
  })
}

// Get one note
const getNote = async (id: string) => {
  try {
    const response = await fetch(`${url}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch note')
    }
    const note: Note = await response.json()
    renderNote(note)
    handleEdit(note)
  } catch (error) {
    console.error(error)
  }
}

// Render most recent note
const renderMostRecentNote = async () => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch notes')
    }
    const data: Note[] = await response.json()
    const mostRecentNote = data[data.length - 1]
    renderNote(mostRecentNote)
    handleEdit(mostRecentNote)

    if (!myNotes) {
      throw new Error('myNotes is not defined')
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Find the added node that matches our note's ID
          const targetNode: any = Array.from(mutation.addedNodes).find(
            (node: any) => node.id === mostRecentNote?.id
          )
          if (targetNode) {
            targetNode.classList.add('active')
            observer.disconnect()
          }
        }
      })
    })

    observer.observe(myNotes, { childList: true, subtree: false })

    setTimeout(() => {
      const mostRecent = document.getElementById(mostRecentNote?.id)
      if (mostRecent) {
        mostRecent.classList.add('active')
        observer.disconnect()
      }
    })
  } catch (error) {
    console.error(error)
  }
}

renderMostRecentNote()

// Edit notes
const handleEdit = (note: Note) => {
  if (!note) return
  const editButton = document.querySelector<HTMLButtonElement>('.edit-button')
  editButton?.addEventListener('click', () => {
    const { title, noteText, id } = note
    renderNoteForm(title, noteText, 'put', id)
    const noteTitleInput =
      document.querySelector<HTMLInputElement>('#note-title-input')
    noteTitleInput?.focus()
  })
}

// Save notes
const handleSave = async (note: NewNote, crudOp: string, id: string) => {
  if (crudOp === 'post') {
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: { 'Content-Type': 'application/json' },
      })
      await getNotes()
      await renderMostRecentNote()
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      await fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: { 'Content-Type': 'application/json' },
      })
      await getNotes()
      await renderMostRecentNote()
    } catch (error) {
      console.log(error)
    }
  }
}

const handleSearch = () => {
  searchInput?.addEventListener('keyup', async (e) => {
    const targetElement = e.target as HTMLInputElement
    const searchTerm = targetElement.value
    const re = RegExp(searchTerm, 'gi')
    await getNotes(re)
  })
}

getNotes()
handleSearch()
