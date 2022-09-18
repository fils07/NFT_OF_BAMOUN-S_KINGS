export default function handler(req,res){
    const tokenId = req.query.tokenId
    const image_url="https://raw.githubusercontent.com/fils07/Bamoun-s-king-collection/main/my-app/src/BkNFT/"
   
    res.status(200).json({
        name : "Bamoun king NFT #" + tokenId,
        description : "BkNFT is an collection of NFT that represent Bamoun's king",
        image: image_url + tokenId + ".png"
    })
}