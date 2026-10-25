document.addEventListener("DOMContentLoaded", () => {
    const answerBox = document.getElementById('answer-box');
    const dateDisplay = document.getElementById('current-date');
    const mainTitle = document.querySelector('h1');
    
    if (dateDisplay) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = "Dzisiaj jest: " + today.toLocaleDateString('pl-PL', options);
    }

    if (answerBox) {
        const today = new Date();
        // Baza niedziel handlowych na 2026
        const shoppingSundays = [
            "2026-01-25", "2026-03-29", "2026-04-26",
            "2026-06-28", "2026-08-30", "2026-12-13", "2026-12-20"
        ];

        const mainAnswer = document.getElementById('main-answer');
        const subAnswer = document.getElementById('sub-answer');

        const formatDate = (dateObj) => {
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const todayStr = formatDate(today);
        answerBox.classList.remove('loading');

        if (today.getDay() === 0) { 
            // Dzisiaj JEST niedziela
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
            // Dzisiaj NIE JEST niedziela - sprawdzamy NAJBLIŻSZĄ niedzielę
            if (mainTitle) {
                // Zmieniamy nagłówek H1 na bardziej kontekstowy, by pasował do "TAK" / "NIE"
                mainTitle.innerText = "Czy najbliższa niedziela jest handlowa?";
            }
            
            const daysUntilSunday = 7 - today.getDay();
            const nextSunday = new Date(today);
            nextSunday.setDate(today.getDate() + daysUntilSunday);
            const nextSundayStr = formatDate(nextSunday);
            
            // Formatowanie daty do wyświetlenia (np. "20 czerwca")
            const displayDate = nextSunday.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
            
            if (shoppingSundays.includes(nextSundayStr)) {
                mainAnswer.innerText = "TAK";
                answerBox.classList.add('answer-yes'); // Używa zielonego koloru
                subAnswer.innerText = `Najbliższa niedziela (${displayDate}) jest handlowa! Zrobisz zakupy we wszystkich sklepach i galeriach.`;
            } else {
                mainAnswer.innerText = "NIE";
                answerBox.classList.add('answer-no'); // Używa czerwonego koloru
                
                // Szukamy następnej w kolejności
                const upcomingSundays = shoppingSundays.filter(date => date > nextSundayStr);
                let extraInfo = upcomingSundays.length > 0 ? ` Kolejna handlowa wypada: ${upcomingSundays[0]}.` : "";
                
                subAnswer.innerText = `Najbliższa niedziela (${displayDate}) jest niehandlowa. Markety będą zamknięte.${extraInfo}`;
            }
        }
    }
});
