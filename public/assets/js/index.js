const myNotes = document.querySelector('.my-notes')

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
		const { title, noteText } = item
		return (listGroupItems += `<a href="#" class="list-group-item list-group-item-action rounded-3" aria-current="true">
															<div class="d-flex w-100 justify-content-between">
																<h5 class="mb-1">${title}</h5>
																<small>3 days ago</small>
															</div>
    													<p class="mb-1">${noteText}</p>
    													<small>And some small print.</small>
  												</a>`)
	})
	myNotes.innerHTML = listGroupItems
}

getNotes(url)
