const axios = require("axios")

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

  const client = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer  `,
    },
  })

// アカウント情報取得
async function getAccountData(){
  const response = await client.post('graphql', { query,variables:{"userName":"michinoins"}})
  console.log(JSON.stringify(response.data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"].slice(-1)[0]["contributionDays"].slice(-1)[0]["contributionCount"]))
}

getAccountData()