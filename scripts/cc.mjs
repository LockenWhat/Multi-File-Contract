import fetch from "node-fetch";
let API = 'https://opensea.io/assets/0xed5af388653567af2f388e6224dc7c4b3241c544'
async function main(){
    let fromTokenId = 1;
    let toTokenId = 5;
    for (let tokenId = fromTokenId; tokenId <= toTokenId; tokenId++) { 
        const url = `${API}/${tokenId}`; 
        console.log(url)
        await fetch(url); 
        console.log(`processing ${tokenId}`);
        
        
    }
}


    /*function click(x,y){
        let d=1
        var ev = d.createEvent("MouseEvent");
        var el = d.elementFromPoint(x,y);
        ev.initMouseEvent(
            "click",
            true , true ,
            window, null,
            x, y, 0, 0, 
            false, false, false, false, 
            0 , null
        );
        el.dispatchEvent(ev);
    }*/

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});