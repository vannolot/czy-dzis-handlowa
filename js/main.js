document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = "Dzisiaj jest: " + today.toLocaleDateString('pl-PL', options);

    // Baza niedziel handlowych na 2026 (Zgodnie z ustawą)
    const shoppingSundays = [
        "2026-01-25",
        "2026-03-29",
        "2026-04-26",
        "2026-06-28",
        "2026-08-30",
        "2026-12-13",
        "2026-12-20"
    ];

    const answerBox = document.getElementById('answer-box');
    const mainAnswer = document.getElementById('main-answer');
    const subAnswer = document.getElementById('sub-answer');

    // Formatowanie daty do YYYY-MM-DD pod lokalną strefę
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    answerBox.classList.remove('loading');

    // Weryfikacja
    if (today.getDay() === 0) { // 0 oznacza niedzielę w JS
        if (shoppingSundays.includes(todayStr)) {
            mainAnswer.innerText = "TAK";
            answerBox.classList.add('answer-yes');
            subAnswer.innerText = "Super! Dzisiaj zrobisz zakupy we wszystkich sklepach i galeriach handlowych.";
        } else {
            mainAnswer.innerText = "NIE";
            answerBox.classList.add('answer-no');
            subAnswer.innerText = "Niestety, galerie handlowe i duże markety są dzisiaj zamknięte.";
        }
    } else {
        // Zwykły dzień tygodnia
        mainAnswer.innerText = "DZIŚ NIE JEST NIEDZIELA";
        answerBox.classList.add('answer-no');
        mainAnswer.style.fontSize = "2.5rem";
        
        const upcomingSundays = shoppingSundays.filter(date => date >= todayStr);
        if(upcomingSundays.length > 0) {
            subAnswer.innerText = "Najbliższa niedziela handlowa wypada: " + upcomingSundays[0];
        } else {
            subAnswer.innerText = "Brak nadchodzących niedziel handlowych w tym roku.";
        }
    }
});
