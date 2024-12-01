export function initCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const newYear = new Date("Jan 1, 2025 00:00:00").getTime();
        const timeLeft = newYear - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days-value").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours-value").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes-value").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds-value").innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateCountdown, 1000);
}
