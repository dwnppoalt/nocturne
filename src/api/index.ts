function addNote(message: string, color: string, author: string, cfTurnstileToken: string) {
    const requestBody = {
        message,
        author,
        color,
        "cf-turnstile-response": cfTurnstileToken, // Updated key to match middleware expectation
    };

    return fetch("https://nocturne-api.vercel.app/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody),
    }).then(async (response) => {
        if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            throw new Error(errorData.error || "Network response was not ok");
        }
        return response.json();
    }).catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    });
}

function searchNotes(query: string, page: number) {
    return fetch(`https://nocturne-api.vercel.app/search?q=${encodeURIComponent(query)}&page=${encodeURIComponent(page)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    }).then(async (response) => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Network response was not ok");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Invalid response format: Expected an array of notes");
        }
        return data;
    }).catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    });
}

function getRandomNote(count: number) {
    return fetch(`https://nocturne-api.vercel.app/random?count=${count}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok" + response.statusText);
        }
        return response.json();
    }).catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    });
}

function getNote(id: string) {
    return fetch(`https://nocturne-api.vercel.app/message/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok" + response.statusText);
        }
        return response.json();
    }).catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    });
}

export { addNote, searchNotes, getRandomNote, getNote };