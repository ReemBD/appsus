import { storageService } from '../../services/storageService.js'
import { utilService } from '../../services/utilService.js'

export const emailService = {
    remove,
    getById
}

const KEY = 'emailsDB';
const gEmails = [];
_createEmails();

function query() {
    return Promise.resolve(gEmails);
}


function _saveEmailsToStorage() {
    storageService.save(KEY, gEmails)
}


function remove(emailId) {
    gEmails = gEmails.filter(email => email.id !== emailId);
    _saveEmailsToStorage();
    return Promise.resolve();
}

function getById(emailId) {
    const email = gEmails.find(email => email.id === emailId);
    return Promise.resolve(email);
}

function _createEmails() {
    gEmails = storageService.load(KEY);
    if (!gEmails || !gEmails.length) {
        gEmails = _getDemoEmails();
        _saveEmailsToStorage();
    }
}


function _getDemoEmails() {
    const emails = [
        { id: 'i101', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
        { id: 'i102', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
        { id: 'i103', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
        { id: 'i104', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
        { id: 'i105', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
        { id: 'i106', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
        { id: 'i107', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
        { id: 'i108', subject: 'I Love You', body: 'Hey Its Emma Watson and wanted to say you look really hot in the pictures', isRead: false, sentAt: Date.now() },
    ];
    return emails;
}