(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`.my-notes`),t=document.querySelector(`.new-note`),n=new bootstrap.Modal(`#confirmModal`,{}),r=document.querySelector(`#search`),i=`/api/notes`,a=null,o=(e=``,t=``,n=`post`,r)=>{let i=document.querySelector(`.note-view`);if(!i)throw Error(`Unable to render note`);i.innerHTML=`
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
			</div>`.trim(),document.querySelector(`.save-button`)?.addEventListener(`click`,()=>{let e=document.querySelector(`.new-note-wrapper`),t=document.querySelector(`#note-title-input`),n=document.querySelector(`#note-text`);if(!t||!n||!e)throw Error(`Unable to save note`);if(t.value.length===0||n.value.length===0){console.log(`No new note to save`);return}let i={title:t.value,noteText:n.value};if(!e)throw Error(`Unable to save note`);let{crudOp:a}=e.dataset;if(!a||!r)throw Error(`Unable to save note`);m(i,a,r),t.value=``,n.value=``})};o();var s=e=>{if(!e)throw Error(`Unable to render note`);let t=document.querySelector(`.note-view`),{title:r,noteText:i}=e,o=`
			<div class="d-flex justify-content-between">
			<h2 class="mb-3 fs-1 fw-bold">${r}</h2>
				<div class="d-flex gap-1">
					<button class="btn btn-info btn-sm edit-button" title="Edit Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l263-262 123 122-263 263H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></button>
					<button class="btn btn-delete btn-sm delete-button" title="Delete Note"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
				</div>
			</div>
			<p class="fs-5">${i}</p>
		`.trim();if(!t)throw Error(`Cannot set note`);t.innerHTML=o,document.querySelector(`.delete-button`)?.addEventListener(`click`,()=>{a=e,n.show()})};document.querySelector(`#confirm`)?.addEventListener(`click`,()=>{c(a),n.hide()});var c=async e=>{let{id:t}=e;console.log(t);try{await fetch(`${i}/${t}`,{method:`DELETE`}),await l(),await f()}catch(e){console.log(e)}},l=async(e=RegExp(``))=>{try{let t=await fetch(i,{method:`GET`,headers:{"Content-Type":`application/json`}});if(!t.ok)throw Error(`Failed to fetch notes`);let n=await t.json();n.sort((e,t)=>new Date(t.updatedAt).getTime()-new Date(e.updatedAt).getTime()),u(n.filter(t=>e.test(t.title)))}catch(e){console.log(`Error`,e)}};t?.addEventListener(`click`,async()=>{o(),await l(),document.querySelector(`#note-title-input`)?.focus()});var u=t=>{if(!e)throw Error(`myNotes is not defined`);e.innerHTML=``;let n=``;if(t.length===0){e.innerHTML=`<div class="text-center">No Notes</div>`;return}t.forEach(e=>{let{title:t,noteText:r,id:i,updatedAt:a}=e;return n+=`
			<div class="list-group-item list-group-item-action rounded-3 note-item" aria-current="true" id="${i}">
				<h5 class="mb-1 text-truncate fw-bolder" data-name="title" style"width: 300px">${t}</h5>
				<p class="mb-1 text-truncate fs-6 fw-lighter d-none d-md-block" data-name="note-text" style="width: 300px">${r}</p>
				<small data-name="date" class="badge text-bg-light float-end d-none d-md-block">${dateFns.formatDistanceToNowStrict(a,{addSuffix:!0})}</small>
			</div>`.trim()}),e.innerHTML=n,document.querySelectorAll(`.note-item`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target,n=e.target;(t.dataset.name===`title`||t.dataset.name===`date`||t.dataset.name===`note-text`)&&(n=t.parentElement),(n.parentNode?.childNodes).forEach(e=>{e.classList.remove(`active`)}),n.classList.add(`active`),d(n.id)})})},d=async e=>{try{let t=await fetch(`${i}/${e}`);if(!t.ok)throw Error(`Failed to fetch note`);let n=await t.json();s(n),p(n)}catch(e){console.error(e)}},f=async()=>{try{let t=await fetch(i);if(!t.ok)throw Error(`Failed to fetch notes`);let n=await t.json(),r=n[n.length-1];if(s(r),p(r),!e)throw Error(`myNotes is not defined`);let a=new MutationObserver(e=>{e.forEach(e=>{if(e.type===`childList`){let t=Array.from(e.addedNodes).find(e=>e.id===r?.id);t&&(t.classList.add(`active`),a.disconnect())}})});a.observe(e,{childList:!0,subtree:!1}),setTimeout(()=>{let e=document.getElementById(r?.id);e&&(e.classList.add(`active`),a.disconnect())})}catch(e){console.error(e)}};f();var p=e=>{e&&document.querySelector(`.edit-button`)?.addEventListener(`click`,()=>{let{title:t,noteText:n,id:r}=e;o(t,n,`put`,r),document.querySelector(`#note-title-input`)?.focus()})},m=async(e,t,n)=>{if(t===`post`)try{await fetch(i,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),await l(),await f()}catch(e){console.log(e)}else try{await fetch(`${i}/${n}`,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),await l(),await f()}catch(e){console.log(e)}};l(),r?.addEventListener(`keyup`,async e=>{let t=e.target.value;await l(RegExp(t,`gi`))});