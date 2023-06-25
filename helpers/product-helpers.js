
var db = require('../config/connection')
var collection = require('../config/collections')
const { ObjectId } = require('mongodb')
var objectId=require('mongodb').ObjectId
module.exports = {
    
    addProduct: (product, callback) => {
        db.get().collection('product').insertOne(product).then((data) => {
            console.log("====", data, "=====");
            callback(data)

        })
    },
    getAllProducts: () => {
        return new Promise(async(resolve, reject) => {
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(prodId)=>{
            return new Promise((resolve,reject)=>{
            console.log(prodId);
            console.log(objectId(prodId));
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
            resolve(response)
            

            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},
            {$set:{
                Name:proDetails.Name,
                category:proDetails.category,
                description:proDetails.description,
                price:proDetails.price,
            }
        }).then((response)=>{
            resolve()
        })
    })
}
}