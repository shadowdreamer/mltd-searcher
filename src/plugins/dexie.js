import Dexie from 'dexie'
let db = new Dexie('testData')
db.version(1).stores({ idols: "id,name,idolType,idolId,rarity,centerEffectName", dataver: '&ver' })
// Do some application logic on the database:
// db.transaction('rw', db.friends, db.dataver, function* () {
//     // db.friends.add({name: "David", age: 40, sex: "male"});
//     // db.friends.add({name: "Ylva", age: 39, sex: "female"});
//     // db.dataver.put({id:1,ver: "ver12.0"});

//     // db.friends.where("name").anyOf('David').each(function(friend) {
//     //     console.log("Found friend: " + friend.name);
//     // });
//     // db.dataver.where('ver').(function(e){
//     //     console.log(e)
//     // });
//     db.dataver.get({ver:'current'},function(ver){
//         if(!ver){
//             db.dataver.put({ver:'current',})
//         }
//     })
// }).catch(function (e) {
//     console.error(e.stack || e);
// });
export {
    db
}