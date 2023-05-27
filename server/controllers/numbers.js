const db = require("../config/db")
const { v4: uuidv4 } = require('uuid');
const { updateDoc,addDoc,getDocs,collection,doc } = require( 'firebase/firestore');

const insert_and_update_numbers = async (req,res) =>{
   
    const docRef = collection(db,'numbers');
    
    const {number_1,number_2,sum,id} = req.body
    
    if(id === ""){
        await addDoc(docRef,{
            number_1 : number_1,
            number_2 : number_2,
            sum : sum
        });
        
        res.status(200).json({
            code : 1,
            message : "numbers Inserted",
        });
    }else{
        const docRef = doc(db,'numbers',id);
        await updateDoc(docRef,{
            number_1 : number_1,
            number_2 : number_2,
            sum : sum
        })
        res.status(200).json({
            code : 1,
            message : "numbers Updated",
        });
    }
}

const get_numbers = async (req,res) =>{

    const docRef = collection(db,'numbers');
    const docSnap = await getDocs(docRef);

    if(docSnap.empty){
        res.status(201).json({
            code:0,
            empty:true,
            data:[]
        })
    }else{
        var data = []
        docSnap.forEach((doc) => {
            data.push({
                _id : doc.id,
                ...doc.data()
            })
        });
        res.status(200).json({
            code:1,
            empty:false,
            data:data
        })
    }
}


module.exports = {
    insert_and_update_numbers,
    get_numbers,
}