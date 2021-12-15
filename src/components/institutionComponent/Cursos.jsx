import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./Cursos.module.css";
import Cursos from "./Cursos/Cursos";
const { ordenar } = require("../utils");

function Cursoss() {
  var obj = {
    id: JSON.parse(localStorage.getItem("user"))._id,
    name: JSON.parse(localStorage.getItem("user")).name,
    cursos: "",
  };
  var [institucion, setIntitucion] = useState(obj);
  var [cursosMap, setCursosMap] = useState([]);
  var [cursosMap2, setCursosMap2] = useState([]);
  var [users, setUsers] = useState([]);
  

  var [pag, setPag] = useState({
    from: 0,
    to: 7,
  });

  //Trae Estudiantes
  async function getStudents(e) {
    var res = await axios("https://rocketproject2021.herokuapp.com/institution/alumnos", {
      method: "post",
      data: {
        name: institucion.name,
      },
    }).then((x) => x.data);
    setUsers(res);
  }

  //Trae cursos
  async function getCursos() {
    var res = await axios(
      "https://rocketproject2021.herokuapp.com/institution/cursos",
      {
        method: "post",
        data: institucion,
      }
    ).then((x) => x.data);
    setCursosMap(res);
    setCursosMap2(res);

    setIntitucion({
      ...institucion,
      cursos: res,
    });
  }

  useEffect(() => {
    getStudents()
    getCursos();
    console.log("EFFECT");
  }, []);

  //Filtra por curso
  function handleChangeFilter(e) {
    const { value } = e.target;
    if (value === "All") {
      setCursosMap(cursosMap2);
    } else {
      const cursoss = cursosMap2.filter((u) => u == value);
      setCursosMap(cursoss);
    }
    // setUsers(users2.filter((u) => u.curso === value));
    // console.log(value, users);
  }

  //Busca por nombre
  const handleChange = (e) => {
    if (e.target.value === "") {
      setCursosMap(cursosMap2);
    }
    setCursosMap(
      cursosMap2.filter((u) =>
        u.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    console.log("Users", users);
  };

  return (
    <div className={s.container}>
      <h2>{institucion.cursos.length} Cursos</h2>

      <div className={s.filtros}>
        <div className={s.orderGroup}>
          <h6>Curso</h6>
          <select onChange={(e) => handleChangeFilter(e)}>
            <option value="All">Todos</option>
            {institucion.cursos &&
              institucion.cursos.map((c) => {
                return <option value={c}>{c}</option>;
              })}
          </select>
        </div>

        <form>
          <input
            placeholder="Buscar Curso..."
            onChange={(e) => handleChange(e)}
            className={s.formInput}
            type="text"
          />
          <button type="submit" className={s.btnSearch}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.1659 16.3718L25 23.206L23.206 25L16.3718 18.1659C14.6533 19.5017 12.4939 20.2972 10.1486 20.2972C4.54369 20.2972 0 15.7536 0 10.1486C0 4.54369 4.54369 0 10.1486 0C15.7536 0 20.2972 4.54369 20.2972 10.1486C20.2972 12.4939 19.5017 14.6533 18.1659 16.3718ZM10.1486 17.7601C14.3523 17.7601 17.7601 14.3523 17.7601 10.1486C17.7601 5.94493 14.3523 2.53716 10.1486 2.53716C5.94493 2.53716 2.53716 5.94493 2.53716 10.1486C2.53716 14.3523 5.94493 17.7601 10.1486 17.7601Z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className={s.studentsContainer}>
        {cursosMap &&
          cursosMap
            .slice(pag.from, pag.to)
            .map(
              (x) => (
                (<Cursos curso={x} id={institucion.id} name= {institucion.name} institution = {institucion.name}/>)
              )
            )}

        <div className={s.pagContainer}>
          {
            <button
              disabled={pag.from > 0 ? false : true}
              onClick={() => setPag({ from: pag.from - 7, to: pag.to - 7 })}
            >
              <svg
                width="9"
                height="11"
                viewBox="0 0 9 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.70679 5.73303L8.176 10.2896L7.1156 11.173L0.585999 5.73303L7.1156 0.29303L8.176 1.17648L2.70679 5.73303Z"
                  fill="#4F4E4E"
                />
              </svg>
            </button>
          }
          <div className={s.pagAct}>
            {pag.to / 7} - {Math.ceil(users.length / 7)}
          </div>
          {
            <button
              disabled={pag.to < users.length ? false : true}
              onClick={() => setPag({ from: pag.from + 7, to: pag.to + 7 })}
            >
              <svg
                width="9"
                height="11"
                viewBox="0 0 9 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.9395 5.49998L0.469749 0.941855L1.53025 0.0581055L8.0605 5.49998L1.53025 10.9419L0.469749 10.0581L5.9395 5.49998Z"
                  fill="#4F4E4E"
                />
              </svg>
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Cursoss;
