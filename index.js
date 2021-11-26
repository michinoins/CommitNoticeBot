const axios = require("axios")
const line = require('@line/bot-sdk')

exports.handler = async (event) => {
     const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});


const commitCount = await getCommitMessage()

const message = {
  type:'text',
  text:`今日のコミット数は${commitCount}でした`
}
await client.pushMessage(process.env.BOT_ID, message).then(() => {
  }).catch((err) => {
    // error handling
  });
}

// 今日のコミット数を取得する
async function getCommitMessage(){
  
// 取得クエリ
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
  // Graph QL クライアント
  const graphClient = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.GITHUB_GRAPH_QL_TOKEN}`,
    },
  })
  
  // アカウント情報取得
  const response = await graphClient.post('graphql', { query,variables:{"userName":process.env.GITHUB_USERNAME}})
  const CurrentDateCommitCount = JSON.stringify(response.data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]
  .slice(-1)[0]["contributionDays"].slice(-1)[0]["contributionCount"])
  
  return CurrentDateCommitCount
}

