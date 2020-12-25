import { storageService } from '../../../services/storageService.js'
import { utilService } from '../../../services/utilService.js'

export const emailService = {
    remove,
    getById,
    query,
    markEmailAsRead,
    addSentEmail,
    getUnReadEmailsCount,
    getReadEmailsCount,
    toggleMarked,
    toggleFav,
    getFavEmailsCount,
    getMarkedEmailsCount
}

const EMAILS_KEY = 'emailsDB'
const SENT_EMAILS_KEY = 'sentEmailsDB'
var gEmails = []
_createEmails()

function query() {
    return Promise.resolve(gEmails)
}

function getUnReadEmailsCount() {
    return gEmails.filter(email => !email.isRead).length
}

function getReadEmailsCount() {
    return gEmails.filter(email => email.isRead).length
}

function getFavEmailsCount() {
    return gEmails.filter(email => email.isFav).length
}

function getMarkedEmailsCount() {
    console.log('marked: ', gEmails.filter(email => email.isMarked).length);
    return gEmails.filter(email => email.isMarked).length

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


function markEmailAsRead(email) {
    const emailToUpdate = {
        ...email
    }
    emailToUpdate.isRead = true
    const emailsCopy = [...gEmails]
    const emailIdx = emailsCopy.findIndex(email => email.id === emailToUpdate.id)
    emailsCopy[emailIdx] = emailToUpdate
    gEmails = emailsCopy
    _saveEmailsToStorage()
    return Promise.resolve(emailToUpdate)
}


function toggleMarked(email) {
    const emailToUpdate = {
        ...email
    }
    emailToUpdate.isMarked = !emailToUpdate.isMarked
    const emailsCopy = [...gEmails]
    const emailIdx = emailsCopy.findIndex(email => email.id === emailToUpdate.id)
    emailsCopy[emailIdx] = emailToUpdate
    gEmails = emailsCopy
    _saveEmailsToStorage()
    return Promise.resolve(emailToUpdate)
}

function toggleFav(email) {
    const emailToUpdate = {
        ...email
    }
    emailToUpdate.isFav = !emailToUpdate.isFav
    const emailsCopy = [...gEmails]
    const emailIdx = emailsCopy.findIndex(email => email.id === emailToUpdate.id)
    emailsCopy[emailIdx] = emailToUpdate
    gEmails = emailsCopy
    _saveEmailsToStorage()
    return Promise.resolve(emailToUpdate)
}

function remove(emailId) {
    gEmails = gEmails.filter(email => email.id !== emailId)
    _saveEmailsToStorage()
    return Promise.resolve()
}

function getById(emailId) {
    const email = gEmails.find(email => email.id === emailId)
    return Promise.resolve(email)
}

function _createEmails() {
    gEmails = storageService.load(EMAILS_KEY)
    if (!gEmails || !gEmails.length) {
        gEmails = _getDemoEmails()
        _saveEmailsToStorage()
    }
}

function _saveEmailsToStorage() {
    storageService.save(EMAILS_KEY, gEmails)
}

function _getDemoEmails() {
    return [
        { id: 'i101', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', from: 'Emma Watson', isFav: true, isMarked: false, isRead: false, sentAt: Date.now() },
        { id: 'i102', subject: 'Wow', body: 'Your code is amazing. I wish I could write code like you.', from: 'Yaron Biton', isMarked: false, isFav: true, isRead: false, sentAt: Date.now() },
        { id: 'i103', subject: 'I Am Real', body: 'Hey Its Mr. Puki. Just so you know - I am Real.', from: 'Puki', isFav: false, isMarked: false, isRead: false, sentAt: Date.now() },
        { id: 'i104', subject: 'PLZ', body: 'PLEASE BE MY PARTNER FOR THIS SPRINT', from: 'every coder ever', isFav: false, isMarked: false, isRead: false, sentAt: Date.now() },
        { id: 'i105', subject: 'Congrats', body: 'You Have won 1 million shekels!', from: 'Ariella', isFav: false, isMarked: false, isRead: false, sentAt: Date.now() },
        { id: 'i106', subject: 'mmm', body: 'mm mmmm mmmm mmm!!!', from: 'Kenny', isFav: false, isMarked: false, isRead: false, sentAt: Date.now() },
        { id: 'i107', subject: 'I Am Spam', body: 'Im somehow hoping you wont notice I am obviously spam.', from: 'Emma Watson', isFav: false, isMarked: false, isRead: false, sentAt: Date.now() },
        { id: 'i108', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', from: 'Emma Watson', isFav: false, isMarked: false, isRead: false, sentAt: Date.now() },
    ]
}