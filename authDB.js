const seed = {
  'chisthoval@icloud.com': {
    password: '12345678',
    firstName: 'Christhoval',
    surName: 'Barba',
    id: '5-706-1803',
    state: 8,
  }
};

let authDB = seed;

const prevAuthDB = localStorage.getItem("@authDB")
if(prevAuthDB){
  authDB = JSON.parse(prevAuthDB);
}

export default {
  db: authDB,
  add(data){
    authDB[data.email] = data;
    localStorage.setItem("@authDB", JSON.stringify(authDB));
  }
};