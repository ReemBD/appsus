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
            txt: "Netflix password: password"
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
                { txt: "Buy a birthday present", doneAt: null, id: utilService.makeId() },
                { txt: "Renew passport", doneAt: 187111111, id: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#FFF475"
        }
    },
    {
        type: "NoteVideo",
        id: 4,
        info: {
            url: 'https://www.youtube.com/embed/tgbNymZ7vqY'
        },
        style: {
            backgroundColor: "#FFF475"
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

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
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
            backgroundColor: "#FFF475" // ADD FUNTIONALITY
        }

    }

    if (noteType === 'NoteTodos') {
        const formattedTodos = []
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

// function formatTodos(noteType, keepTxt) {
//     const userTodos = keepTxt.split(',')
//     const formattedTodos = []
//     userTodos.forEach(todo => {
//         formattedTodos.push({
//             txt: todo,
//             doneAt: null,
//             id: utilService.makeId()
//         })
//     })
//     const note = {
//         type: noteType,
//         id: utilService.makeId(),
//         isPinned: false,
//         info: {
//             todos: formattedTodos
//         },
//         style: {
//             backgroundColor: "#FFF475" // ADD FUNTIONALITY
//         }

//     }
//     const gNotesCopy = [...gNotes]
//     gNotesCopy.unshift(note)
//     gNotes = gNotesCopy;
//     console.log(gNotes);
//     _saveNotesToStorage()
// }

// function formatText(noteType, keepTxt) {
//     const note = {
//         type: noteType,
//         id: utilService.makeId(),
//         isPinned: false,
//         info: {
//             txt: keepTxt
//         },
//         style: {
//             backgroundColor: "#FFF475" // ADD FUNTIONALITY
//         }
//     }
//     const gNotesCopy = [...gNotes]
//     gNotesCopy.unshift(note)
//     gNotes = gNotesCopy;
//     console.log(gNotes);
//     _saveNotesToStorage()

// }

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