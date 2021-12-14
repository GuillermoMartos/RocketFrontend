import axios from 'axios';
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import s from "./Tables.module.css"


function Tables() {
    var [group, setGroup] = useState("")
    var groups = useSelector((state)=>state.groups)
    
    async function assignTableRandom(){
        await axios("http://localhost:3001/asignTableRandom",{
            method:"post",
            data:{
                institution:JSON.parse(localStorage.getItem("user")).institution,
                curso:group.toUpperCase()
            }
        })
        Swal.fire("Se mezclaron aleatoriamente las mesas del grupo "+group.toUpperCase()+" con exito!")
        await axios("http://localhost:3001/addClass", {
            method: "post",
            data: {
              curso: group,
              institution: JSON.parse(localStorage.getItem("user")).institution,
            },
          });
    }
    async function assignTableSmart(){
        await axios("http://localhost:3001/asignTable",{
            method:"post",
            data:{
                institution:JSON.parse(localStorage.getItem("user")).institution,
                curso:group.toUpperCase()
            }
        })
        Swal.fire("Se mezclaron inteligentemente las mesas del grupo "+group.toUpperCase()+" con exito!")
        await axios("http://localhost:3001/addClass", {
            method: "post",
            data: {
              curso: group,
              institution: JSON.parse(localStorage.getItem("user")).institution,
            },
          });
    }
    return (
        <div className={s.container}>
            <div className={s.selectGroup}>
                <h4>Select Group</h4>
                <select value={group} onChange={(e)=>setGroup(e.target.value)}>
                    {groups.map(x=>(
                        <option value={x.toLowerCase()}>{x}</option>
                    ))}
                </select>
            </div>
            <div className={s.botonesContainer}>
                <button className={s.random} onClick={assignTableRandom}>RANDOM SHUFFLE</button>
                <button className={s.smart} onClick={assignTableSmart}>SMART SHUFFLE</button>
            </div>
        </div>
    )
}

export default Tables
