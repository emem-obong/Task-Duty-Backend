const notFound = (req, res)=>{
    res.json({
        message:"Route Not Found"
    })
}

module.exports = notFound;