async function cekNama() {
    const nama = document.getElementById('nameInput').value;
    const resultElement = document.getElementById('result');

    if (nama) {
        try {
            const response = await fetch(`https://api.nationalize.io/?name=${nama}`);
            const data = await response.json();
            let negara = data.country[0].country_id;
            if (data.gender) {
                resultElement.innerHTML = `<strong>${nama}</strong> is from <strong>${negara}</strong> with <strong>${data.probability * 100}%</strong> certainty.`;
            } else {
                resultElement.innerHTML = `Uh oh. <strong>${nama}</strong> is unknown to us`;
            }
        } catch (error) {
            resultElement.textContent = 'An error occurred while fetching the data.';
        }
    } else {
        resultElement.textContent = 'Please enter a name.';
    }
}

function kirim(event) {
    if (event.key === 'Enter') {
        cekNama();
    }
}