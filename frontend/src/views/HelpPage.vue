<template>
    <div style="height: 100%;">
        <h1>Help</h1>
        <br>
        <p>Remember, it is your repsonsiblity to contact the necessary parties/departments and ask them to approve your activity request.</p>
        <br>
        <div id="main-iframe">
            <div>
                <a 
                target="_blank"
                href="https://docs.google.com/document/d/e/2PACX-1vRYPrF8qfWMcZ7nzHuzDz1h12YmMVBn67LPiXrTWFP8p8--HirbUxQo7OFA1EldafxSSU2CzlkBRTAV/pub">Open in new tab</a>
            </div>
            <iframe src="https://docs.google.com/document/d/e/2PACX-1vRYPrF8qfWMcZ7nzHuzDz1h12YmMVBn67LPiXrTWFP8p8--HirbUxQo7OFA1EldafxSSU2CzlkBRTAV/pub?embedded=true"></iframe>
        </div>
    </div>
</template>

<style scoped>
#main-iframe {
    border: 0;
    max-width: 880px;
    width: 100%;
    height: 70vh;
    display: block;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px;
}

#main-iframe > div {
    position: fixed;
    display: block;
    width: 100%;
    max-width: 880px;
}

#main-iframe > div > a {
    text-decoration: none;
    display: block;
    background: #fccb0b;
    color: black;
    float: right;
    padding: 10px;
    margin: -5px -5px 0 0;
    border-radius: 4px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
}

#main-iframe > div > a:hover {
    box-shadow: 300vw 300vh 2px 0 rgba(0, 0, 0, 0.14);
}

iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
}
</style>
