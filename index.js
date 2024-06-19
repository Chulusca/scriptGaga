import('node-fetch').then(({ default: fetch }) => {

    const url = "https://api.tellonym.me/tells/new";

    const payload = {
        avatarFileName: "98389584_gvibtf0avqpwm2yxhhfxqfqi80cboetj.jpg",
        isInstagramInAppBrowser: false,
        isSenderRevealed: false,
        isSnapchatInAppBrowser: false,
        limit: 25,
        tell: "Preguntenle a waj si le dijo feliz dia del padre a pablito de info D",
        userId: "98389584",
        username: "gestionb24"
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        agent: new (require('https').Agent)({ rejectUnauthorized: false })
    };

    const sendRequest = async () => {
        try {
            const response = await fetch(url, requestOptions);
            if (response.status === 429) {
                console.log("Rate limited, waiting...");
                await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds
                return await sendRequest(); // Retry the request
            }
            else{   
                console.log("Request successful");
                console.log('Response:', response.status);
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Realizar múltiples solicitudes (en este caso, 5 veces)
    for (let i = 0; i < 5; i++) {
        sendRequest();
    }
});
