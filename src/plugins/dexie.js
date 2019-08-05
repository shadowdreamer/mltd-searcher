import Dexie from 'dexie'
let db = new Dexie('mltd_db')
db.version(1).stores({ idols: "id,addDate,idolType,idolId,rarity,extraType,wish", dataver: '&ver'})
export {
    db
}