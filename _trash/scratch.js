const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          dataLength: data.length,
          preview: data.substring(0, 500)
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function run() {
  console.log("Waiting 3 seconds for dev server to start...");
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Testing CD Calculator...");
  const cdResult = await testUrl("http://localhost:3000/en/calculators/cd-calculator");
  console.log("CD Calculator Status:", cdResult.status || cdResult.error);
  if (cdResult.status !== 200) {
    console.log("CD Preview:", cdResult.preview);
  }

  console.log("Testing Savings Calculator...");
  const savingsResult = await testUrl("http://localhost:3000/en/calculators/savings-calculator");
  console.log("Savings Calculator Status:", savingsResult.status || savingsResult.error);
  if (savingsResult.status !== 200) {
    console.log("Savings Preview:", savingsResult.preview);
  }
}

run();
