async function cekNama() {
    const nama = document.getElementById('nameInput').value;
    const resultElement = document.getElementById('hasil');

    if (nama) {
        try {
            const response = await fetch(`https://api.nationalize.io/?name=${nama}`);
            const data = await response.json();
            const countryList = await fetch('country.json').then(res => res.json());

            if (data.country.length > 0) {
                let countryId = data.country[0].country_id;
                let negara = getCountryName(countryId, countryList);
                let bendera = getFlagEmoji(countryId);

                resultElement.innerHTML = `${bendera} <strong>${nama}</strong> is from <strong>${negara}</strong> with <strong>${(data.country[0].probability * 100).toFixed(2)}%</strong> certainty.`;
            } else {
                resultElement.innerHTML = `Uh oh. <strong>${nama}</strong> is unknown to us.`;
            }
        } catch (error) {
            resultElement.textContent = 'An error occurred while fetching the data.';
        }
    } else {
        resultElement.textContent = 'Please enter a name.';
    }
}

function getCountryName(countryId, countryList) {
    return countryList[countryId] || 'Unknown Country';
}

function getFlagEmoji(countryCode) {
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

function kirim(event) {
    if (event.key === 'Enter') {
        cekNama();
    }
}