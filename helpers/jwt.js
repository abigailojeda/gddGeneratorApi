const jwt = require('jsonwebtoken');

const generateJWT = (id, username) => {

    const payload = {id, username};

    return new Promise((resolve, reject)=>{
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        }, (err, token)=>{
    
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token);
            }
        });

    });


}

module.exports = {
    generateJWT
}