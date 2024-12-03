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
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).send('ID and status are required');
        }

        const token = req.cookies.token;
        const decoded_token = jwt.verify(token, jwt_secret);
        const userId = decoded_token.user_id;

        if (status === "occupied") {
            // 사용 시작: 누구나 가능
            const updateResult = await Laundary.updateOne(
                { laundary_id: id }, 
                { $set: { status: status, user: userId } }
            );

            if (updateResult.matchedCount === 0) {
                return res.status(404).send('세탁기를 찾을 수 없습니다.');
            }
        } else if (status === "available") {
            // 사용 종료: 현재 사용자만 가능
            const laundary = await Laundary.findOne({ laundary_id: id });
            if (!laundary) {
                return res.status(404).send('세탁기를 찾을 수 없습니다.');
            }

            if (laundary.user !== userId) {
                return res.status(403).send('본인이 사용 중인 세탁기만 변경할 수 있습니다.');
            }

            const updateResult = await Laundary.updateOne(
                { laundary_id: id }, 
                { $set: { status: status, user: "" } }
            );

            if (updateResult.matchedCount === 0) {
                return res.status(404).send('세탁기를 찾을 수 없습니다.');
            }
        }

        res.status(200).json({ message: "상태가 변경되었습니다." });

    } catch (error) {
        console.log(error);
        res.status(500).send('서버 오류가 발생했습니다.');
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