export const currentNoteComponent = (
  title: string,
  noteText: string
): string => {
  return `
			<div class="d-flex justify-content-between">
			<h2 class="mb-3 fs-1 fw-bold">${title}</h2>
				<div class="d-flex gap-1">
					<button class="btn btn-info btn-sm edit-button" title="Edit Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l263-262 123 122-263 263H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
					<button class="btn btn-delete btn-sm delete-button" title="Delete Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
				</div>
			</div>
			<p class="fs-5">${noteText}</p>
		`.trim()
}
