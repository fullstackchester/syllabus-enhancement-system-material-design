
function generateEid(): string {
    const year = new Date().getFullYear().toString().slice(-2); // Get the last two digits of the year
    const randomThreeDigits = Math.floor(Math.random() * 999 + 1).toString().padStart(3, '0'); // Generate random number between 001 and 999
    return year + randomThreeDigits;
}

export default generateEid;