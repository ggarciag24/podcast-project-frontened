document.addEventListener("DOMContentLoaded", ()=> {
  console.log("works");

  getTopics()
  initializeNewPodcast()

})

function getTopics(){
  fetch("http://localhost:3000/topics")
  .then(resp => resp.json())
  .then(topicsObjArr => {
      topicsObjArr.forEach(topic => {
        renderTopic(topic)
      })
  })
}

function renderTopic(topic){
    let topicArea = document.querySelector(".topic-name")
    topicArea.innerText = topic.name
    topicArea.id = topic.id

    topic.podcasts.forEach(p => {
      renderPodcast(p)
    })
}

function renderPodcast(p){

    let body = document.querySelector("body")

    let cardHolder = document.createElement("div")
    cardHolder.className = "overall-card"
    cardHolder.id = p.id


    let podcastdiv = document.createElement("div")
    podcastdiv.className = "podcast-info"

    let podcastName = document.createElement("h3")
    podcastName.className = "pod-name"
    podcastName.innerText = p.name
    podcastdiv.appendChild(podcastName)

    let podcastAvatar = document.createElement("img")
    podcastAvatar.className = "podcast-pic"
    podcastAvatar.src = p.image
    podcastdiv.appendChild(podcastAvatar)

    let podcastDescriptionTitle = document.createElement("h4")
    podcastDescriptionTitle.innerText = "Description:"
    podcastdiv.appendChild(podcastDescriptionTitle)

    let podcastDescription = document.createElement("p")
    podcastDescription.className = "podcast-description"
    podcastDescription.innerText = p.description
    podcastdiv.appendChild(podcastDescription)

    let noteBtn = document.createElement("button")
    noteBtn.className = "note-button"
    noteBtn.innerText = "Add Note"
    noteBtn.id = p.id
    noteBtn.addEventListener("click", handleAddBtnAction)
    podcastdiv.appendChild(noteBtn)

    let delBtn = document.createElement("button")
    delBtn.className = "del-pod-button"
    delBtn.innerText = "Delete"
    delBtn.id = p.id
    delBtn.addEventListener("click", handleDelPodBtnAction)
    podcastdiv.appendChild(delBtn)

    let noteDiv = document.createElement("div")
    noteDiv.className = "notes-location"
    let noteHeader = document.createElement("h4")
    noteHeader.innerText = " Notes:"
    let noteul = document.createElement("ul")
    noteul.className = "note-list"
    noteul.id = `note-list-${p.id}`
    noteHeader.appendChild(noteul)

    noteDiv.appendChild(noteHeader)
    podcastdiv.appendChild(noteDiv)
    cardHolder.appendChild(podcastdiv)
    body.appendChild(cardHolder)

    p.personal_notes.forEach(note => {
      renderNote(note)
    })

}


function renderNote(note){

  let podcastId = note.podcast_id

  let ul = document.querySelector(`#note-list-${podcastId}`)
  let li = document.createElement("li")
  li.className = "note"
  li.id = note.id

  let div = document.createElement("div")
  div.className = "note-info"

  let episodep = document.createElement("p")
  episodep.className = "note-episode"
  episodep.innerText = note.episode
  div.appendChild(episodep)

  let ratingp = document.createElement("p")
  ratingp.className = "note-rating"
  ratingp.innerText = note.rating
  div.appendChild(ratingp)

  let explanationp = document.createElement("p")
  explanationp.className = "note-explanation"
  explanationp.innerText = note.explanation
  div.appendChild(explanationp)

  let editBtn = document.createElement("button")
  editBtn.innerText = "Edit"
  editBtn.addEventListener("click", handleEdit)
  div.appendChild(editBtn)

  let deleteBtn = document.createElement("button")
  deleteBtn.innerText = "Delete"
  deleteBtn.addEventListener("click", handleDelete)
  div.appendChild(deleteBtn)
  li.appendChild(div)

  ul.appendChild(li)
}

function handleEdit(e){
  let noteDiv = e.target.parentElement
  let noteLi = e.target.parentElement.parentElement
  let noteId = noteLi.id
  let podcast_id = e.target.parentElement.parentElement.parentElement.id

  let editDiv = document.createElement("div")
  editDiv.className = "edit-div"
  editDiv.id = noteId
  let episodeDiv = document.createElement("div")
  let episodeparagraph = document.createElement("p")
  episodeparagraph.innerText = "Episode:"
  episodeDiv.appendChild(episodeparagraph)
  let episodeTextfield = document.createElement("input")
  episodeTextfield.className = "edit-episode-input"
  episodeTextfield.innerText = e.target.parentElement.querySelector(".note-episode").innerText
  episodeDiv.appendChild(episodeTextfield)

  let ratingDiv = document.createElement("div")
  let ratingparagraph = document.createElement("p")
  ratingparagraph.innerText = "Rating:"
  ratingDiv.appendChild(ratingparagraph)
  let ratingTextfield = document.createElement("input")
  ratingTextfield.className = "edit-rating-input"
  ratingTextfield.innerText = e.target.parentElement.querySelector(".note-rating").innerText
  ratingDiv.appendChild(ratingTextfield)

  let explanationDiv = document.createElement("div")
  let explanationparagraph = document.createElement("p")
  explanationparagraph.innerText = "Explanation:"
  explanationDiv.appendChild(explanationparagraph)
  let explanationTextfield = document.createElement("input")
  explanationTextfield.className = "edit-explanation-input"
  explanationTextfield.innerText = e.target.parentElement.querySelector(".note-explanation").innerText
  explanationDiv.appendChild(explanationTextfield)

  let editBtn = document.createElement("button")
  editBtn.innerText = "Edit"
  let editForm = document.querySelector(".edit-form")
  editForm.dataset.id = podcast_id.slice(10)
  editDiv.append( episodeDiv, ratingDiv, explanationDiv, editBtn)
  editForm.appendChild(editDiv)
  editForm.addEventListener("submit", (e) => displayEdit(e, noteLi))
  // debugger
}

function initializeNewPodcast(){
  let newPodcastBtn = document.querySelector(".new-podcast")
  newPodcastBtn.addEventListener("click", handleNewPodcast)
}

function handleNewPodcast(e){
  let newForm = document.createElement("form")
  let namep = document.createElement("p")
  namep.innerText = "Name:"
  let nameInput = document.createElement("input")
  nameInput.className = "name-input"
  namep.appendChild(nameInput)
  newForm.appendChild(namep)

  let imgp = document.createElement("p")
  imgp.innerText = "Image:"
  let imgInput = document.createElement("input")
  imgInput.className = "img-input"
  imgp.appendChild(imgInput)
  newForm.appendChild(imgp)

  let descriptionp = document.createElement("p")
  descriptionp.innerText = "Description:"
  let descriptionInput = document.createElement("input")
  descriptionInput.className = "description-input"
  descriptionp.appendChild(descriptionInput)
  newForm.appendChild(descriptionp)

  let createBtn = document.createElement("button")
  createBtn.innerText = "Create Podcast"
  newForm.appendChild(createBtn)

  let formDiv = document.querySelector(".new-podcast-form-location")
  formDiv.appendChild(newForm)
  newForm.addEventListener("submit", displayNewPodcast)
}

function displayNewPodcast(e){
  e.preventDefault()
  let newPodcastForm = {
    name: e.target.querySelector(".name-input").value,
    image: e.target.querySelector(".img-input").value,
    description: e.target.querySelector(".description-input").value,
    topic_id: document.querySelector(".topic-name").id
  }

  // debugger
///////////////////////////////////////////////////////////////////////////////////////////////////
  fetch("http://localhost:3000/podcasts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(newPodcastForm)
  })
  .then(res => res.json())
  .then(data => {
    renderPodcast(data)
  })
}

function handleDelPodBtnAction(e){
  let cardholder = e.target.parentElement.parentElement
  let podcastId = cardholder.id

  fetch(`http://localhost:3000/podcasts/${podcastId}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
    cardholder.remove()
  })

}



function displayEdit(e, noteLi){
  e.preventDefault()

  let noteId = e.target.querySelector(".edit-div").id
  // debugger
  let editedForm = {
    id: noteId,
    episode: e.target.querySelector(".edit-episode-input").value,
    rating: e.target.querySelector(".edit-rating-input").value,
    explanation: e.target.querySelector(".edit-explanation-input").value,
    podcast_id: e.target.dataset.id
  }

  fetch(`http://localhost:3000/personal_notes/${noteId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(editedForm)
  })
  .then(res => res.json())
  .then(data => {
    noteLi.querySelector(".note-episode").innerText = data.episode
    noteLi.querySelector(".note-rating").innerText = data.rating
    noteLi.querySelector(".note-explanation").innerText = data.explanation
  })
}


function handleDelete(e){
  let noteLi = e.target.parentElement.parentElement
  let noteId = noteLi.id

  fetch(`http://localhost:3000/personal_notes/${noteId}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
      noteLi.remove()
  })
}

function handleSubmit(e){
  e.preventDefault()
  let wholeForm = e.target
  let formEpisode = e.target.querySelector(".note-episode").value
  let formRating = e.target.querySelector(".note-rating").value
  let formExplanation = e.target.querySelector(".note-explanation").value
  let ul = document.querySelector(".note-list")

  let formInfo = {
    personal_note : {
      episode: formEpisode,
      rating: formRating,
      explanation: formExplanation,
      podcast_id: e.target.dataset.podcastId
    }
  }
debugger
  fetch("http://localhost:3000/personal_notes", {
    method: "POST",
    headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
    },
    body: JSON.stringify(formInfo)
  })
  .then(res => res.json())
  .then(data => {
      renderNote(data)
  })
}

function handleAddBtnAction(e){
  let form = document.querySelector(".note-form")
  form.style.backgroundColor = "yellow"
  form.dataset.podcastId = e.target.id
debugger
  form.addEventListener("submit", handleSubmit)
}
