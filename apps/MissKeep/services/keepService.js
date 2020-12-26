import { storageService } from '../../../services/storageService.js'
import { utilService } from '../../../services/utilService.js'

export const keepService = {
    query,
    saveNote,
    deleteNote,
    updateNote,
    pinNote,
    todoUpdate,
    changeColor,
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
            txt: "Netflix password: password"
        },
        style: {
            backgroundColor: "linear-gradient(#F9EFAF, #F7E98D)"
        }
    },
    {
        type: "NoteImg",
        id: 2,
        isPinned: false,
        info: {
            url: "https://images.pexels.com/photos/1370697/pexels-photo-1370697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "linear-gradient(#F9EFAF, #F7E98D)"
        }
    },
    {
        type: "NoteTodos",
        id: 3,
        isPinned: false,
        info: {
            txt: 'Buy a birthday present, Renew passport',
            todos: [
                { txt: "Buy a birthday present", doneAt: null, id: utilService.makeId() },
                { txt: "Renew passport", doneAt: 187111111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "linear-gradient(#F9EFAF, #F7E98D)"
        }
    },
    {
        type: "NoteVideo",
        id: 4,
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/tgbNymZ7vqY'
        },
        style: {
            backgroundColor: "linear-gradient(#F9EFAF, #F7E98D)"
        }
    },


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

function updateNote(noteId, txt) {
    const notes = [...gNotes]
    const noteToUpdateIdx = getNoteIdxById(noteId)
    notes[noteToUpdateIdx].info.txt = txt
    gNotes = notes
    _saveNotesToStorage()
    return Promise.resolve()
}

function changeColor(color, noteId) {
    const noteToUpdateIdx = getNoteIdxById(noteId)
    const notes = [...gNotes]
    let cssColor;
    if (color === 'yellow') cssColor = 'linear-gradient(#F9EFAF, #F7E98D)'
    else if (color === 'purple') cssColor = '#D7AEFB'
    else if (color === 'green') cssColor = '#CAF4B9'
    else if (color === 'blue') cssColor = '#b9dcf4'
    else cssColor = '#FFBDA3'
    notes[noteToUpdateIdx].style.backgroundColor = cssColor
    gNotes = notes
    _saveNotesToStorage()
    return Promise.resolve()
}

function pinNote(noteId) {
    const noteToUpdateIdx = getNoteIdxById(noteId)
    const notes = [...gNotes]
    notes[noteToUpdateIdx].isPinned = !notes[noteToUpdateIdx].isPinned
    gNotes = notes
    _saveNotesToStorage()
    return Promise.resolve()

}

function todoUpdate(todos, noteId) {
    const noteToUpdateIdx = getNoteIdxById(noteId)
    const notes = [...gNotes]
    notes[noteToUpdateIdx].info.todos = todos
    gNotes = notes
    _saveNotesToStorage()
    return Promise.resolve()
}
function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function getNoteIdxById(noteId) {
    return gNotes.findIndex(note => note.id === noteId)
}

function formatNote(note) {
    const { noteType, keepTxt } = note;
    const formmatedNote = {
        type: noteType,
        id: utilService.makeId(),
        isPinned: false,
        info: {
            todos: null,
            txt: null,
            url: null
        },
        style: {
            background: "linear-gradient(#F9EFAF, #F7E98D)" // ADD FUNTIONALITY
        }

    }

    if (noteType === 'NoteTodos') {
        const formattedTodos = []
        formmatedNote.info.txt = keepTxt // To allow easy filtering in todos
        const userTodos = keepTxt.split(',')
        userTodos.forEach(todo => {
            formattedTodos.push({
                txt: todo,
                doneAt: null,
                id: utilService.makeId()
            })
        })

        formmatedNote.info.todos = formattedTodos
        formmatedNote.type = noteType;

    }
    else if (noteType === 'NoteText') {
        formmatedNote.type = noteType
        formmatedNote.info.txt = keepTxt
    }
    else if (noteType === 'NoteImg') {
        formmatedNote.type = noteType;
        formmatedNote.info.url = keepTxt;
    }

    else if (noteType === 'NoteVideo') {
        formmatedNote.type = noteType;
        formmatedNote.info.url = keepTxt
    }

    const gNotesCopy = [...gNotes]
    gNotesCopy.unshift(formmatedNote)
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