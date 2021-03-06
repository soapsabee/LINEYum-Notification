const request = require('request')
var firebase = require('firebase');
var firestore = require('firestore');
const settings = {timestampsInSnapshots: true};

var config = {
    apiKey: "AIzaSyAJIRibfhC67xSdhSJNEgSjah7b1qsEG28",
    authDomain: "psuproject-e92e0.firebaseapp.com",
    databaseURL: "https://psuproject-e92e0.firebaseio.com",
    projectId: "psuproject-e92e0",
    storageBucket: "psuproject-e92e0.appspot.com",
    messagingSenderId: "34613977797"
  };
  firebase.initializeApp(config);
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
  db.settings(settings);
 
  function checkDataOnFirebase(req,res) {
    var id = parseInt(req.params.id);
    var latitude = parseFloat(req.params.latitude);
    var longitude = parseFloat(req.params.longitude);
    var allProductRef = db.collection("person").where("pid", "==", id);
    allProductRef.get().then(function (querySnapshot) {
       
      if (querySnapshot.size >0 ) {
        var data = querySnapshot.docs.map(function (documentSnapshot) {
          alertNotification(documentSnapshot.data(),latitude,longitude);
          
        });
        
      } else {
        console.log('document not found');
      }    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
    
   
  }


function alertNotification(data,latitude,longitude){

request({
    method: 'POST',
    uri: 'https://notify-api.line.me/api/notify',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      bearer: 'LYpXRnyLdRmclHWwRLVqIEDHvjzc7bJoDchm6FoITz9', //token
    },
    form: {
      message:`คุณ  ${data.name}   ${data.lastname}    ป้ายทะเบียนรถ : ${data.carcode}   "กรุณาติดต่อพี่ยามด้วยครับ"  สถานที่ติดต่อ: http://www.google.com/maps/place/${latitude},${longitude} หากท่านไม่มาติดต่อภายใน 10 นาที ทางมหาลัยจะมีการจัดการตามกฎระเบียบ`, //ข้อความที่จะส่ง
    },
  }, (err, httpResponse, body) => {
    if (err) {
      console.log(err)
    } else {
      console.log(body)
    }
  })

}

  module.exports = {
    alertNotification,
    checkDataOnFirebase
    

};