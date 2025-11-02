const notes = document.querySelector('#notes')
const list = document.createElement('ul')

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
	let listItems = ''
	data.forEach((item) => (listItems += `<li>${item.title}</li>`))
	list.innerHTML = listItems
	notes.appendChild(list)
}

getNotes(url)
