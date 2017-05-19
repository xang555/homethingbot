/**
 * Created by xang on 20/04/2017.
 */


function homethingbotConfig() {

this.homethingapi = "http://homething:3000/fcm";
this.fcm_secret = "eyJ1YWRtaW4iOiJhZG1pbiIsInBhZG1pbiI6ImFkbWluIiwiaWF0IjoxNDkyNzUyOTAwLCJleHAiOjE0OTI4MzkzMDB9";
}

module.exports = function () {
    return new homethingbotConfig();
};
