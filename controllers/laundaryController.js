const getLaundaryStatus = async(req, res) => {
    try {
        // url param으로 세탁기 id 받고
        // DB에서 id에 맞는 세탁기 찾아서
        // 데이터 보내주기
        res.send("laundary status")       
    } catch (error) {
        console.log(error)
    }
}

const setLaundaryStatus = async(req, res) => {
    try {
        // req로 사용 요청인지 사용 완료 요청인지, 그리고 어떤 세탁기인지 body로 데이터 받고
        // DB에서 해당 세탁기 status 바꾼다음에
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