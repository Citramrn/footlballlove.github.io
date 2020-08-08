let webPush = require("web-push");
 
const vapidKeys = {
   "publicKey": "BMpvxYxWPTKRXHkm_jV8EOp2lNTeJqKJW-_vNDH97R_HgxYKbPNgJ0VLI_73rOSvAbadqDwyjyPeEkf4e9r-MeE",
   "privateKey": "FWbavQyWh04NNzyPFjQu4tPNt-uHCsaJCFrJmz9d4_4"
};
 
webPush.setVapidDetails(
   'mailto:ctrmirna@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fYqWiLHZtLk:APA91bHZddDhiiN6czlTClhmfygp8tARPH1l5hrcVCirY556pARVtfFUpoTuLPsb8bw_GQHfmXX3Mjup_KLZ2vh7u3oEEXCzKVPHz0dLYJsPQtcoXFu82UlygOuIJ1ooutYSK_N-eY85",
   "keys": {
       "p256dh": "BI1Ipydr363aO586PIiLweF91S6PRvgoW3wC/hsEC3xk+2oJqhG4EzXMthhby4pxzIClhtgNrBdDZ21UoHS2eMU=",
       "auth": "TxbWiNve5n7QFpVN84YwKA==" 
   }
};

var payload = "Bismillah";

var options = {
   gcmAPIKey: '51273203006', 
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
)
