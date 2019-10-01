document.addEventListener("DOMContentLoaded", ()=> {
  console.log("works");

  getTopics()
  // initializeForm()

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

    topic.podcasts.forEach(p => {
      renderPodcast(p)
    })

}

function renderPodcast(p){

    let body = document.querySelector("body")

    let cardHolder = document.createElement("div")
    cardHolder.className = "overall-card"

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


    let noteDiv = document.createElement("div")
    noteDiv.className = "notes-location"
    let noteHeader = document.createElement("h4")
    noteHeader.innerText = " Notes:"
    let noteul = document.createElement("ul")
    noteul.className = "note-list"
    noteul.id = p.id
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

  let ul = document.querySelector(".note-list")
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

  let deleteBtn = document.createElement("button")
  deleteBtn.innerText = "Delete"
  deleteBtn.addEventListener("click", handleDelete)
  div.appendChild(deleteBtn)
  li.appendChild(div)

  ul.appendChild(li)
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

  form.addEventListener("submit", handleSubmit)
}
