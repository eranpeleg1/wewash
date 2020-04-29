const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const settings ={timestampsInSnapshots: true};
admin.firestore().settings(settings);
const fire = admin.firestore();

exports.setUser = functions.https.onRequest((req, res) => {
    let displayName = req.body.displayName;
    if(displayName === undefined || displayName === null || displayName === ''){
        displayName = req.body.email.split('@')[0];
    }
    const resObject = {
        userId:req.body.userId,
        email:req.body.email,
        photoURL: req.body.photoURL ? req.body.photoURL : null,
        displayName:displayName,
        isAnonymous:false
    }
    fire.collection('Users').doc(resObject.userId).set(resObject).then(() => res.sendStatus(200))
        .catch(e => {
            console.log('unable to set user: ',e)
            return res.sendStatus(500)
        })
})

exports.getUser = functions.https.onRequest((req, res) => {
    const userId = req.body.userId;

    let refUsers = fire.collection('Users').doc(userId);
    refUsers.get().then(dataUser => res.status(200).send(dataUser.data()))
        .catch(e => {
            console.log('unable to get user: ', e)
            return res.sendStatus(500)
        })
})





