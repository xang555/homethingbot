/**
 * Created by xang on 19/05/2017.
 */

"use strict";

var rp =  require('request-promise');
var admin = require("firebase-admin");
var serviceAccount = require("./laothing.json");
var conf = require('./config')();
var promis = require('bluebird');
var _ = require('lodash');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://laothing-d014b.firebaseio.com"
});


 var db = admin.database();
 var ref = db.ref("alert_listener");


function alertbot() {


    this.botRaning = function () {

        ref.on('child_added',function (snapshot) {

           if (snapshot.val()){
               SendAlert(snapshot.val())
                   .then(function (body) {
                       console.log(body);
                       if (!_.isEqual(body.err,1)){

                           ref.child(snapshot.key).remove()
                               .then(function () {
                                   console.log('delete gas alert successfully');
                               }).catch(function (err) {
                                    console.log(err);
                                });
                       }

                   })
                   .catch(function (err) {
                       console.error(err);
                   });
           }else {
               console.log(snapshot.val());
           }

        },function (err) {
            console.log("The read failed: " + err.code);
        });

    }; // bot running

    function SendAlert($sdid) {

       return new promis(function (resolve, reject) {

           var options = {
               method: 'POST',
               uri: conf.homethingapi,
               headers:{
                   'Authorization': conf.fcm_secret,
               },
               form: {
                   'sdid': $sdid
               },
               json: true // Automatically stringifies the body to JSON
           };

         rp(options).then(function (body) {
            resolve(body);
         }).catch(function (err) {
             reject(err);
         });

       });

    } // send to homething api

} // bot class


module.exports = function () {
    return new alertbot();
};