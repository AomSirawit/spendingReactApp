import { useEffect, useState } from 'react'
import './FormComponent.css'
import { v4 as uuidv4 } from 'uuid';

const FormComponent = (props) =>{

    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState(0)
    const [formValid,setFormValid] = useState(false)

   const inputTitle = (event) => {
        setTitle(event.target.value) 
    }
    const inputAmount = (event) =>{
        setAmount(event.target.value)
    }
    const saveItem = (event) =>{
        event.preventDefault()
        const itemData = { 
            id:uuidv4(),
            title:title,
            amount:Number(amount) // แปลง str เป็น number
        }
        props.onAddItem(itemData)

        setTitle('') //เคลียร์ค่าเเป็นค่าเริ่มต้น
        setAmount(0) //เคลียร์ค่าเเป็นค่าเริ่มต้น

    }

    useEffect(() =>{
        const checkData = title.trim().length > 0 && amount !==0
        setFormValid(checkData)
      
    },[title,amount])

    return(
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>ขื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการของคุณ" onChange={inputTitle} value={title}/>
                </div>

                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input type="number" placeholder="(+ รายรับ , - รายจ่าย)" onChange={inputAmount} value={amount}/>
                </div>

                <div>
                    <button type="submit" className='Btn' disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>

            </form>

        </div>
    )

}

export default FormComponent;