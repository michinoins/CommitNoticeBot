const fetch = require('node-fetch');


// スキーマを定義する
const query = `
query($userName:String!) { 
    user(login: $userName){
        contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`



   
fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
      'Authorization': `Bearer `,
    },
  }).then(res => res.text())
    .then(body => console.log(body)) 
    .catch(error => console.error(error));

// type Shop{
//   id: ID!
//   name: String!
// }
// とobject型を指定し,

// type Query {
//   shops: [Shop]!
// }
// とQueryインターフェースに追加できる、すごい


