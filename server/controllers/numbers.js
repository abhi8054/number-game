const db = require("../config/db")
const { v4: uuidv4 } = require('uuid');
const { doc,setDoc,getDoc } = require( 'firebase/firestore');

const insert_and_update_numbers = async (req,res) =>{
    console.log(req.body);
    const {id,number_1,number_2,sum} = req.body;

    const _id = id !== undefined ? id : "1";
    const numbersRef = doc(db,'numbers',_id);

    await setDoc(numbersRef,{
        number_1 : number_1,
        number_2 : number_2,
        sum : sum
    });

    res.status(200).json({
        code : 1,
        message : "numbers Inserted",
    });
}

const get_numbers = async (req,res) =>{

    const docRef = doc(db, "numbers", "1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(200).json({
            code:1,
            data:docSnap.data()
        })
    } else {
        res.status(201).json({
            code:0,
            data:[]
        })
    }
}


module.exports = {
    insert_and_update_numbers,
    get_numbers,
}