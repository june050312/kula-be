const { ObjectId } = require('mongodb')
let connectDB = require('./../utils/database.js')
let db
connectDB.then((client)=>{
  console.log('DB connect on laundary')
  db = client.db('kula')
}).catch((err)=>{
  console.log(err)
}) 

const getLaundaryStatus = async(req, res) => {
    try {
        // url param으로 세탁기 id 받고
        const laundaryId = req.params.id;
        if (!laundaryId) {
            return res.status(400).send('Laundary ID is required');
        }
      
        // DB에서 id에 맞는 세탁기 찾아서
        const laundary = await db.collection('laundary').findOne({ _id: new ObjectId(laundaryId) });
        if (!laundary) {
            return res.status(404).send('Laundary not found');
        }

        // 데이터 보내주기
        res.render('laundary.ejs', { laundary });

    } catch (error) {
        console.log(error)
    }
}

const setLaundaryStatus = async(req, res) => {
    try {
        // req로 사용 요청인지 사용 완료 요청인지, 그리고 어떤 세탁기인지 body로 데이터 받고
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).send('ID and status are required');
        }
        const laundaryId = new ObjectId(id);

        // DB에서 해당 세탁기 status 바꾼다음에
        // DB에서 해당 세탁기 상태 업데이트
        const updateResult = await db.collection('laundary').updateOne({ _id: laundaryId }, { $set: { status } });
        if (updateResult.matchedCount === 0) {
            return res.status(404).send('Laundary not found');
        }

        // res로 http status code 보내주기
        res.status(201).send("laundary status changed successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLaundaryStatus,
    setLaundaryStatus
}