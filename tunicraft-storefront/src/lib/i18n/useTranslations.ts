import messagesFr from '@/locales/fr/messages.json'
import messagesEn from '@/locales/en/messages.json'
import messagesAr from '@/locales/ar/messages.json'

export function getMessages(locale: string) {
    switch (locale) {
        case 'en':
            return messagesEn
        case 'ar':
            return messagesAr
        default:
            return messagesFr
    }
}