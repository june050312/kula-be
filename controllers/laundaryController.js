const Laundary = require('../models/laundary.js')
const Shop = require("../models/shop.js")
const jwt_secret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

const getLaundaryStatus = async(req, res) => {
    try {
        // url param으로 세탁기 id 받고
        const laundaryId = req.params.id;
        if (!laundaryId) {
            return res.status(400).send('Laundary ID is required');
        }
      
        // DB에서 id에 맞는 세탁기 찾아서
        console.log(laundaryId)
        const laundary = await Laundary.findById(laundaryId)
        console.log(laundary)
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
        const laundaryId = id;

        const token = req.cookies.token
        const decoded_token = jwt.verify(token, jwt_secret)

        console.log(laundaryId)

        // 사용 불가능하게 만들어야함
        if (status === "occupied") {

            await Laundary.updateOne({ laundary_id: laundaryId }, { $set: { status: status, user: decoded_token.user_id } })

        // 사용 가능하게 만들어야함
        } else if (status === "available") {

            const laundaryData = Laundary.findById(laundaryId)
            if (decoded_token.user_id !== laundaryData.user) {
                return res.status(400).send("you can't change this laundary status")
            }


            // DB에서 해당 세탁기 status 바꾼다음에
            // DB에서 해당 세탁기 상태 업데이트
            const updateResult = await Laundary.updateOne({ _id: laundaryId }, { $set: { status: status, user: "" } });
            if (updateResult.matchedCount === 0) {
                return res.status(404).send('Laundary not found');
            }

            // res로 http status code 보내주기
            res.status(201).send("laundary status changed successfully")
        } else {
            return res.status(400).send("this laundary machine has a problem")
        }

    } catch (error) {
        console.log(error)
    }
}

const addLaundary = async (req, res) => {
    try {
        // req.body에서 세탁기의 name과 초기 status를 받음
        const { id, shopname } = req.body;

        console.log(id, shopname)


        // name과 status가 제공되지 않았다면 에러 반환
        if (!id || !shopname) {
            return res.status(400).send('id and shop name are required');
        }


        // Laundary 모델을 사용해 새로운 세탁기 인스턴스 생성
        // const newLaundary = await new Laundary({ name, status });
        // 세탁기 데이터를 DB에 저장
        const result = await Laundary.create({
            laundary_id: id,
            status: "available",
            shopname: shopname
        });

        // 추가된 세탁기의 ID를 반환
        res.status(201).send({ message: 'Laundary added successfully', id: result.insertedId });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while adding laundary');
    }
};

const searchLaundary = async(req, res) => {
    try {
        const { body } = req.body


        const shop = await Shop.find({ shopname: body })
        console.log(shop)

        if(shop[0].shopname === body) {
            return res.status(200).send(body)
        } else {
            return res.status(400).send("wrong name")
        }
        
    } catch (error) {
        console.log(error)
    }
}

const getLaundaryByShop = async(req, res) => {
    try {
        const { shop }= req.params
        console.log(shop)

        const shopLaundary = await Laundary.find({ shopname: shop })
        console.log(shopLaundary)

        res.send(shopLaundary)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLaundaryStatus,
    setLaundaryStatus,
    addLaundary,
    searchLaundary,
    getLaundaryByShop,

} 