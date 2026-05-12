const BASE_URL = 'http://localhost:3000';

window.onload = () => {
    document.getElementById('btn-creer').addEventListener('click', creerBibliotheque);
    document.getElementById('btn-cle').addEventListener('click', recupererCle);
};

function afficherMessage(idMessage, texte, type, idCle = null, cle = null) {
    const msg = document.getElementById(idMessage);
    msg.textContent = texte;
    msg.className = `message ${type}`;
    msg.style.display = 'block';

    if (idCle && cle) {
        const cleEl = document.getElementById(idCle);
        cleEl.textContent = `Clé API : ${cle}`;
        cleEl.style.display = 'block';
    }
}

async function creerBibliotheque() {
    const nom          = document.getElementById('creer-nom').value.trim();
    const courriel     = document.getElementById('creer-courriel').value.trim();
    const mot_de_passe = document.getElementById('creer-mdp').value.trim();

    if (!nom || !courriel || !mot_de_passe) {
        afficherMessage('creer-message', 'Tous les champs sont requis.', 'erreur');
        return;
    }

    try {
        const reponse = await fetch(`${BASE_URL}/api/bibliotheques`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, courriel, mot_de_passe })
        });

        const data = await reponse.json();

        if (!reponse.ok) {
            afficherMessage('creer-message', data.erreur, 'erreur');
            return;
        }

        afficherMessage('creer-message', 'Bibliothèque créée avec succès !', 'succes', 'creer-cle', data.cle_api);

    } catch (erreur) {
        console.log(erreur);
        afficherMessage('creer-message', 'Impossible de contacter le serveur.', 'erreur');
    }
}

async function recupererCle() {
    const courriel     = document.getElementById('cle-courriel').value.trim();
    const mot_de_passe = document.getElementById('cle-mdp').value.trim();
    const nouvelle     = document.getElementById('cle-nouvelle').checked ? 1 : 0;

    if (!courriel || !mot_de_passe) {
        afficherMessage('cle-message', 'Courriel et mot de passe requis.', 'erreur');
        return;
    }

    try {
        const reponse = await fetch(`${BASE_URL}/api/bibliotheques/cle?nouvelle=${nouvelle}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courriel, mot_de_passe })
        });

        const data = await reponse.json();

        if (!reponse.ok) {
            afficherMessage('cle-message', data.erreur, 'erreur');
            return;
        }

        const msg = nouvelle ? 'Nouvelle clé générée !' : 'Clé récupérée avec succès !';
        afficherMessage('cle-message', msg, 'succes', 'cle-resultat', data.cle_api);

    } catch (erreur) {
        console.log(erreur);
        afficherMessage('cle-message', 'Impossible de contacter le serveur.', 'erreur');
    }
}