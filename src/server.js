const express = require('express');
const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.json());

const routes = require('./routes/router');
app.use(routes);
app.use((req, res) => {
    res.status(404).send({
    message: 'Resource not found!'
    });
});


app.listen(app.get('port'), () => {
 console.log("Connected on port", app.get('port'));
});
