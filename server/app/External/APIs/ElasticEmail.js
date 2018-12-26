const eeClient = require('elasticemail-webapiclient').client;

const options = {
    apiKey: '8c5ec067-137c-4a6a-8a8f-8614e88b2233',
    apiUri: 'https://api.elasticemail.com/',
    apiVersion: 'v2'
}

const EE = new eeClient(options);

// Load account data
EE.Account.Load().then(function(resp) {
    console.log(resp);
});

const emailParams = {
    "subject": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    "to": 'pedro.carolina@polygon.pt',
    "from": 'pedro.carolina@polygon.pt',
    "replyTo": 'replyto@baz.com',
    "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
    ' Curabitur in lectus id ipsum laoreet dignissim in ut odio. Duis volutpat arcu dolor, eu cursus mi vestibulum ut.' +
    ' Etiam eu ipsum orci. Vestibulum aliquam eros in massa dapibus malesuada. Proin sit amet blandit nulla, eu porttitor neque.' +
    ' Duis consequat erat est, sit amet condimentum turpis sagittis sit amet. Nam fringilla, tellus ac euismod elementum,' +
    ' ipsum ante consequat nisi, ut lobortis arcu sapien vel ex. Mauris sit amet magna a ipsum porttitor hendrerit.' +
    ' Nam elementum iaculis tellus, nec euismod ante. Suspendisse nec lobortis magna, at placerat augue.' +
    ' Quisque luctus scelerisque metus, ut facilisis mi consectetur vel. Ut augue diam, ornare dictum tincidunt a,' +
    ' volutpat nec arcu. Mauris iaculis bibendum pulvinar. Quisque vestibulum, magna quis aliquam tincidunt,' +
    ' leo eros luctus nibh, eu dictum nisl velit id mauris.',
    "fromName": 'John Doe',
    "bodyType": 'Plain'
};

 function sendEmail(emailParams) {
   EE.Email.Send(emailParams).then(function(resp) {
    console.log(resp);
  });
}

module.exports = {
  sendEmail,
  emailParams
}
