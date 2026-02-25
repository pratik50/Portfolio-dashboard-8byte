export function isMarketOpen(): boolean {
    const now = new Date()

    const IST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))

    const day = IST.getDay()
    const hours = IST.getHours()
    const minutes = IST.getMinutes()
    const time = hours * 100 + minutes

    // Weekend pe band 
    if (day === 0 || day === 6) return false

    // 9:15 AM to 3:30 PM
    return time >= 915 && time <= 1530
}