import { storageService } from '../../../services/storageService.js'
import { utilService } from '../../../services/utilService.js'

export const sentEmailService = {
    getById,
    addSentEmail,
    getSentEmailsCount
}
const KEY = 'sentEmailsDB'
var gSentEmails = []
_getSentEmails()

function getById(emailId) {
    const email = gSentEmails.find(email => email.id === emailId)
    return Promise.resolve(email)
}

function addSentEmail(email) {
    const emailToAdd = {
        id: utilService.makeId(),
        sentAt: Date.now(),
        ...email
    }
    gSentEmails = [emailToAdd, ...gSentEmails]
    _saveSentEmailsToStorage();

    return Promise.resolve(emailToAdd)
}

function getSentEmailsCount() {
    return gSentEmails.length;
}


function _saveSentEmailsToStorage() {
    storageService.save(KEY, gSentEmails)
}

function _loadSentEmailsFromStorage() {
    return Promise.resolve(storageService.load(KEY))
}


function _getSentEmails() {
    _loadSentEmailsFromStorage().then(sentEmails => {

        if (!sentEmails || !sentEmails.length) gSentEmails = [];
        else gSentEmails = sentEmails;
    })
}