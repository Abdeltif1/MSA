const getPrayers = async (req, res) => {
    try{
        const url = "https://api.aladhan.com/v1/timingsByCity/23-08-2024?city=Montreal&country=Canada&method=4&adjustment=1";
        const response = await fetch(url);
        if(response.ok){
            const data =await response.json();
            const prayers = await data.data.timings;
            res.status(200).json(prayers);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const getJumaa = async(req, res) => {
    try{
        const url = "https://api.aladhan.com/v1/timingsByCity/23-08-2024?city=Montreal&country=Canada&method=4&adjustment=1";
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            const jumaa = await data.data.timings.Dhuhr;
            res.status(200).json(jumaa);
            
        }
    }
    catch(err){
        console.log(err);
        
    }
};



module.exports = {getPrayers, getJumaa};