import { storageService } from '../../../services/storageService.js'
import { utilService } from '../../../services/utilService.js'

export const keepService = {
    query,
    saveNote,
    deleteNote,
    getNoteById,

}


const KEY = 'notesDB';
var gNotes = [];
var demoNotes = [
    {
        type: "NoteText",
        id: 1,
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#FFF475"
        }
    },
    {
        type: "NoteImg",
        id: 2,
        info: {
            url: "https://images.pexels.com/photos/1370697/pexels-photo-1370697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#FFF475"
        }
    },
    {
        type: "NoteTodos",
        id: 3,
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "#FFF475"
        }
    }
];

_createNotes()

function _createNotes() {
    gNotes = storageService.load(KEY);
    if (!gNotes || !gNotes.length) {
        gNotes = demoNotes;
        _saveNotesToStorage()
    }
    console.log('loaded notes:', gNotes);
}

function saveNote(note) {
    console.log(note);
    formatNote(note)
}

function deleteNote(noteId) {
    gNotes = gNotes.filter(note => note.id !== noteId)
    _saveNotesToStorage()
    return Promise.resolve()
}

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
}
function formatNote(note) {
    const { noteType, keepTxt } = note;
    if (noteType === 'NoteTodos') {
        formatTodos(noteType, keepTxt)
    }
    else if (noteType === 'NoteText') {
        formatText(noteType, keepTxt)
    }
    else if (noteType === 'NoteImg') {
        formatImg(noteType, keepTxt)
    }

}

function formatTodos(noteType, keepTxt) {
    const userTodos = keepTxt.split(',')
    const formattedTodos = []
    userTodos.forEach(todo => {
        formattedTodos.push({
            txt: todo,
            doneAt: null
        })
    })
    const note = {
        type: noteType,
        id: utilService.makeId(),
        isPinned: false,
        info: {
            todos: formattedTodos
        },
        style: {
            backgroundColor: "#FFF475" // ADD FUNTIONALITY
        }

    }
    const gNotesCopy = [...gNotes]
    gNotesCopy.unshift(note)
    gNotes = gNotesCopy;
    console.log(gNotes);
    _saveNotesToStorage()
}

function formatText(noteType, keepTxt) {
    const note = {
        type: noteType,
        id: utilService.makeId(),
        isPinned: false,
        info: {
            txt: keepTxt
        },
        style: {
            backgroundColor: "#FFF475" // ADD FUNTIONALITY
        }
    }
    const gNotesCopy = [...gNotes]
    gNotesCopy.unshift(note)
    gNotes = gNotesCopy;
    console.log(gNotes);
    _saveNotesToStorage()

}

function formatImg(noteType, keepTxt) {
    const note = {
        type: noteType,
        id: utilService.makeId(),
        isPinned: false,
        info: {
            url: keepTxt,
            title: 'My Image' // ADD THIS FUNCTIONALITY
        },
        style: {
            backgroundColor: "#FFF475" // ADD FUNTIONALITY
        }
    }
    const gNotesCopy = [...gNotes]
    gNotesCopy.unshift(note)
    gNotes = gNotesCopy;
    console.log(gNotes);
    _saveNotesToStorage()
}


function query() {
    return Promise.resolve(gNotes);
}

function _saveNotesToStorage() {
    storageService.save(KEY, gNotes);
}