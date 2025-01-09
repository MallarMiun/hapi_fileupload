# API Dokumentation

## Introduktion
Det här API:et används för att hantera användare och uppladdning av profilbilder. Det innehåller två huvudsakliga funktioner:
- Hantering av användare (användarnamn och profilbild).
- Uppladdning av filer för profilbilder.


## Endpoints

### 1. Användare

#### Hämta användarprofil
**GET** `/users/{userId}`

Hämta information om en användare, inklusive användarnamn och profilbild.

#### Uppdatera användare
**PUT** `/users/{userId}`

Uppdatera en användares användarnamn eller URL till profilbild.

#### Skapa ny användare
**POST** `/users`

Skapa en ny användare med användarnamn och eventuell profilbild.

---

### 2. Uppladdning

#### Ladda upp profilbild
**POST** `/upload/{userId}`

Ladda upp en profilbild för en användare. Bilden skickas som en fil i en `FormData`-förfrågan.

---

## Modeller

### Användare
Modellen för en användare innehåller följande fält:

| Fält           | Typ    | Beskrivning                     |
|----------------|--------|---------------------------------|
| `_id`          | String | Unikt ID för användaren.       |
| `username`     | String | Användarens användarnamn.      |
| `profileImage` | String | URL till användarens profilbild. |

---

## Installation

1. Klona repositoryt:
   ```bash
   git clone https://github.com/ditt-repo-url.git
   cd ditt-repo-url
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

3. Skapa en `.env`-fil med följande innehåll:
   ```env
   DATABASE=mongodb+srv://anvandare:lösenord@cluster.mongodb.net/databasnamn
   ```

4. Starta servern:
   ```bash
   npm start
   ```

---

## Användning

### Ladda upp profilbild
1. Skicka en `POST`-förfrågan till `/upload/{userId}` med en bild i `file`-fältet i en `FormData`.
2. Servern sparar bilden och returnerar URL:en till den.

### Uppdatera användarprofil
1. Skicka en `PUT`-förfrågan till `/users/{userId}` med nytt användarnamn eller profilbildens URL.

### Hämta användarprofil
1. Skicka en `GET`-förfrågan till `/users/{userId}`.

---

## Noteringar
- Se till att katalogen som anges i `UPLOAD_PATH` finns, eller skapas automatiskt innan uppladdning (kontrollera att du har skrivrättigheter).
- API:et kontrollerar filformat och storlek vid uppladdning.