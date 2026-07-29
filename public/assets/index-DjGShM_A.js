(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>`<div class="page-wrapper">
    <div
      class="page-inner border border-0 shadow-lg rounded-3 bg-light-subtle p-0"
    >
      <header class="">
        <nav class="border border-bottom border-1 rounded-top-3 p-3">
          <div class="logo fw-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#0a9a93"
            >
              <path
                d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm100 210v-60h400v60H280Zm0 180v-60h279v60H280Z"
              />
            </svg>
            NoteFlow
          </div>
          <div class="search input-group input-group-md mb-0">
            <span class="input-group-text" id="inputGroup-sizing-md"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path
                  d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
                /></svg
            ></span>
            <input
              type="text"
              class="form-control"
              name="search"
              id="search"
              aria-label="search"
              aria-describedby="inputGroup-sizing-md"
            />
          </div>

          <div class="new-note">
            <button type="button" class="btn btn-primary new-note">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path
                  d="M120-120v-720h720v348q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H120Zm80-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z"
                />
              </svg>
              New Note
            </button>
          </div>
        </nav>
      </header>
      <main>
        <section class="notes-section">
          <div class="notes-wrapper">
            <div class="p-3 notes-list">
              <h2 class="fs-4 fw-semibold mb-3">My Notes</h2>
              <div class="my-notes list-group gap-3"></div>
            </div>
            <div class="p-3 note-view"></div>
          </div>
        </section>
        <section>
          <div
            class="modal fade modal-sm"
            id="confirmModal"
            tabindex="-1"
            aria-labelledby="ModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <h1 class="modal-title fs-6" id="ModalLabel">
                    Confirm Delete
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  class="modal-body d-flex align-items-center gap-2 justify-content-center"
                >
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm d-flex align-items-center justify-content-between"
                    data-bs-dismiss="modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                      />
                    </svg>
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm d-flex align-items-center justify-content-between"
                    id="confirm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path
                        d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z"
                      />
                    </svg>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>`,t=(e,t,n)=>`
			<div class="h-100 new-note-wrapper" data-crud-op="${n}">
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
							value="${e}"
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
						>${t}</textarea>
				</div>
			</div>`.trim(),n=(e,t)=>`
			<div class="d-flex justify-content-between">
			<h2 class="mb-3 fs-1 fw-bold">${e}</h2>
				<div class="d-flex gap-1">
					<button class="btn btn-info btn-sm edit-button" title="Edit Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l263-262 123 122-263 263H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
					<button class="btn btn-delete btn-sm delete-button" title="Delete Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
				</div>
			</div>
			<p class="fs-5">${t}</p>
		`.trim(),r=document.querySelector(`#root`);(()=>{if(!r)throw Error(`mainPage is null`);r.innerHTML=e()})();var i=document.querySelector(`.my-notes`),a=document.querySelector(`.new-note`),o=new bootstrap.Modal(`#confirmModal`,{}),s=document.querySelector(`#search`),c=`http://localhost:5000/notes`,l=null,u=(e=``,n=``,r=`post`,i)=>{let a=document.querySelector(`.note-view`);if(!a)throw Error(`Unable to render note`);a.innerHTML=t(e,n,r),document.querySelector(`.save-button`)?.addEventListener(`click`,()=>{let e=document.querySelector(`.new-note-wrapper`),t=document.querySelector(`#note-title-input`),n=document.querySelector(`#note-text`);if(!t||!n||!e)throw Error(`Unable to save note`);if(t.value.length===0||n.value.length===0){console.log(`No new note to save`);return}let r={title:t.value,noteText:n.value};if(!e)throw Error(`Unable to save note`);let{crudOp:a}=e.dataset;if(!a||!i)throw Error(`Unable to save note`);v(r,a,i),t.value=``,n.value=``})};u();var d=e=>{if(!e)throw Error(`Unable to render note`);let t=document.querySelector(`.note-view`),{title:r,noteText:i}=e,a=n(r,i);if(!t)throw Error(`Cannot set note`);t.innerHTML=a,document.querySelector(`.delete-button`)?.addEventListener(`click`,()=>{l=e,o.show()})};document.querySelector(`#confirm`)?.addEventListener(`click`,()=>{f(l),o.hide()});var f=async e=>{let{id:t}=e;console.log(t);try{await fetch(`${c}/${t}`,{method:`DELETE`}),await p(),await g()}catch(e){console.log(e)}},p=async(e=RegExp(``))=>{try{let t=await fetch(c,{method:`GET`,headers:{"Content-Type":`application/json`}});if(!t.ok)throw Error(`Failed to fetch notes`);let n=await t.json();n.sort((e,t)=>new Date(t.updatedAt).getTime()-new Date(e.updatedAt).getTime()),m(n.filter(t=>e.test(t.title)))}catch(e){console.log(`Error`,e)}};a?.addEventListener(`click`,async()=>{u(),await p(),document.querySelector(`#note-title-input`)?.focus()});var m=e=>{if(!i)throw Error(`myNotes is not defined`);i.innerHTML=``;let t=``;if(e.length===0){i.innerHTML=`<div class="text-center">No Notes</div>`;return}e.forEach(e=>{let{title:n,noteText:r,id:i,updatedAt:a}=e;return t+=`
			<div class="list-group-item list-group-item-action rounded-3 note-item" aria-current="true" id="${i}">
				<h5 class="mb-1 text-truncate fw-bolder" data-name="title" style"width: 300px">${n}</h5>
				<p class="mb-1 text-truncate fs-6 fw-lighter d-none d-md-block" data-name="note-text" style="width: 300px">${r}</p>
				<small data-name="date" class="badge text-bg-light float-end d-none d-md-block">${dateFns.formatDistanceToNowStrict(a,{addSuffix:!0})}</small>
			</div>`.trim()}),i.innerHTML=t,document.querySelectorAll(`.note-item`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target,n=e.target;(t.dataset.name===`title`||t.dataset.name===`date`||t.dataset.name===`note-text`)&&(n=t.parentElement),(n.parentNode?.childNodes).forEach(e=>{e.classList.remove(`active`)}),n.classList.add(`active`),h(n.id)})})},h=async e=>{try{let t=await fetch(`${c}/${e}`);if(!t.ok)throw Error(`Failed to fetch note`);let n=await t.json();d(n),_(n)}catch(e){console.error(e)}},g=async()=>{try{let e=await fetch(c);if(!e.ok)throw Error(`Failed to fetch notes`);let t=await e.json(),n=t[t.length-1];if(d(n),_(n),!i)throw Error(`myNotes is not defined`);let r=new MutationObserver(e=>{e.forEach(e=>{if(e.type===`childList`){let t=Array.from(e.addedNodes).find(e=>e.id===n?.id);t&&(t.classList.add(`active`),r.disconnect())}})});r.observe(i,{childList:!0,subtree:!1}),setTimeout(()=>{let e=document.getElementById(n?.id);e&&(e.classList.add(`active`),r.disconnect())})}catch(e){console.error(e)}};g();var _=e=>{e&&document.querySelector(`.edit-button`)?.addEventListener(`click`,()=>{let{title:t,noteText:n,id:r}=e;u(t,n,`put`,r),document.querySelector(`#note-title-input`)?.focus()})},v=async(e,t,n)=>{if(t===`post`)try{await fetch(c,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),await p(),await g()}catch(e){console.log(e)}else try{await fetch(`${c}/${n}`,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),await p(),await g()}catch(e){console.log(e)}};p(),s?.addEventListener(`keyup`,async e=>{let t=e.target.value;await p(RegExp(t,`gi`))});