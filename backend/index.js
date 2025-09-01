const express= require('express');
const app = express();
const PORT=5000 || process.env.PORT;
const pyqs= require("./data.json")
const cors = require('cors');
app.use(cors());

app.get('/api/pyqs', (req, res) => {
    const subject= req.query.subject?.toLowerCase();
    if(!subject) {
        return res.status(400).json({ error: 'Subject query parameter is required' });
    }
    const result= pyqs.find((item)=>
        item.subject.toLowerCase().includes(subject)
    );
    if(!result){
        return res.status(404).json({ error: 'No PYQ found for the specified subject' });
    }
    return res.json(result);
});
//server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});