import React,{useEffect, useState} from 'react'
import style from "./Dashboard.module.css"
import NumberField from '../components/NumberField'
import Button from '../components/Button'
import axios from 'axios'

function Dashboard() {

    const [data,setData] = useState({
        number_1 :"",
        number_2 :""
    })
    const [result,setResult] = useState(0)
    const [error,setError] = useState(false)

    useEffect(() =>{
        getPrevData()
    },[])

    const changeHandler = (e) =>{

        setData({
            ...data,
            [e.target.name] : parseInt(e.target.value)
        })
    } 

    const getPrevData = async () =>{
        let config = {
            method: 'get',  
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/get_numbers`,
            headers: { 
              'Content-Type' : 'application/json'
            },
          };
          try{
            const result = await axios(config)
            const {number_1,number_2,sum} = result.data.data
            setData({
                number_1:number_1,
                number_2:number_2,
            });
            setResult(sum)
          }catch(e) {
            console.log(e)
          }
    }
    

    const clickHandler = async (e) =>{
        console.log("data",data);
        if(isNaN(data.number_1) || isNaN(data.number_2)) {
            setError(true)
            return
        };
        setError(false)
        let config = {
            method: 'post',  
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/insert_and_update_numbers`,
            headers: { 
              'Content-Type' : 'application/json'
            },
            data : {
                ...data,
                sum : data.number_1+data.number_2
            }
          };
          try{
            const result = await axios(config)
            console.log(result);
            setResult(data.number_1+data.number_2)
            console.log(data);
          }catch(e) {
            console.log(e)
          }
    }


  return (
    <div className={style.container}>
        <div className={style.wrapper}>
            <h2>Number Game</h2>
            <div className={style.numbers}>
                <NumberField 
                    label='First Number'
                    name='number_1'
                    value = {data.number_1}
                    onChangeHandler={changeHandler}
                    styles={{borderRadius:'10px'}}
                />
                <NumberField 
                    label='Second Number'
                    name='number_2'
                    value = {data.number_2}
                    onChangeHandler={changeHandler}
                    styles={{borderRadius:'10px'}}
                />
            </div>
            <div className={style.btn}>
                <Button
                    onClickHandler={clickHandler}
                >ADD</Button>
            </div>
            {
                error &&
                <div className={style.error}>
                    <p>*All fields required</p>
                </div>
            }

            <div className={style.result}>
                <h4>Sum is {result}</h4>
            </div>
        </div>
    </div>
  )
}

export default Dashboard