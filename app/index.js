cat << 'EOF' > app/index.js
const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', container: os.hostname() });
});

app.get('/', (req, res) => {
    res.json({
        message: "Hello from the production-ready microservice cluster!",
        processed_by_host: os.hostname(),
        timestamp: new Date()
    });
});

app.listen(port, () => {
    console.log(`Application actively listening on port ${port}`);
});
EOF
