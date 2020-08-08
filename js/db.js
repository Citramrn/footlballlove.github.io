const dbPromise = idb.open('football', 1, upgradeDb => {
 switch (upgradeDb.oldVersion){
   case 0:
    upgradeDb.createObjectStore('cardsinner', { 'keyPath': 'id' })
 }
});

//saved
function insertClubss(footballs) { 
  dbPromise.then(function (dbs) {
    const tx = dbs.transaction('cardsinner', 'readwrite');
    const store = tx.objectStore('cardsinner')
    store.put(footballs)
    return tx.complete;
  }).then(function () {
    M.toast({ html: `${footballs.name} berhasil disimpan!` })
    console.log('Berhasil');
  }).catch(error => {
    console.error('Gagal', error)
  })
}

function getHistoryTeams(){
 return dbPromise.then(function (db) {
    const tx = db.transaction('cardsinner', 'readonly');
    const store = tx.objectStore('cardsinner');
    return store.getAll();
})
}

const insertClickAdd = teamsFouls => {
  const tim = dataTeams.teams.filter(els => els.id == teamsFouls)[0]
   insertClubss (tim);
   console.log(teamsFouls + "Add To History")
}

function deleteClickItem(teamsInggris) {
  dbPromise.then(function(db){
    const tx = db.transaction('cardsinner', 'readwrite');
    const store = tx.objectStore('cardsinner');
    store.delete(teamsInggris);
    return tx.complete;
  }).then(function (){
    M.toast({html: 'deleted'});
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification("yeah, deleted");
      });
  } else {
      console.error('FItur notifikasi tidak diijinkan.');
  }
    getHistory();
  }).catch(error => {
    console.log('Error : ' , error)
  })
}

const deleteClick = clickItem => {
  const dlt = confirm("delete teams footballs")
  if (dlt == true){
    deleteClickItem(clickItem);
    console.log(clickItem  + "success deleted")
  }
}
