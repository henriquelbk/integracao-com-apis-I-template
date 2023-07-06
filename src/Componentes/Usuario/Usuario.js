import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const User = styled.div`
  border: black 1px solid;
  margin-top: 8px;
  width: 350px;
  padding: 8px;
`;
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getUserById(props.usuario.id);
  }, [props.usuario]);

  const getUserById = (id) => {
    const headers = {
      headers: {
        Authorization: "henrique-louback-easley",
      },
    };

    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}/`,
        headers
      )
      .then((response) => {
        setUsuario(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {usuario.name}
          </p>
          <p>
            <strong>E-mail:</strong> {usuario.email}
          </p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button>Excluir</button>
    </User>
  );
}

export default Usuario;
