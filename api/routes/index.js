const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
    res.json({app: 'Hola'})
})

app.get('/iecho', (req, res) => {
    const { text } = req.query;
    
    if( typeof text === 'string' && text.length >= 3){
        
        const result = text.split('').reverse().join('');
        const palindrome = isPalindrome(text, result);


        return res.json({ 'text' : result , palindrome})
        
    }

    return res.status(400).send({'error' : 'Bad request'});
});

const isPalindrome = (str1, str2) => {
    if(str1.replaceAll(' ', '').toLowerCase() === str2.replaceAll(' ', '').toLowerCase()) {
        return true;
    }
    return false;
}

module.exports = app;