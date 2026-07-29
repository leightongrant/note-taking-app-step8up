export const newNoteComponent = (
  title: string,
  noteText: string,
  crudOp: string
): string => {
  return `
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
}
