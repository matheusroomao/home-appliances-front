import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function Create() {
    const [APIData, setAPIData] = useState([]);

    let history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [voltage, setVoltage] = useState('');
    const [brand_id, setBrand] = useState('');
    const postData = () => {
        axios.post(`http://127.0.0.1:8000/api/products`, {
            name,
            description,
            voltage,
            brand_id
        }).then(() => {
            history.push('/')
        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }


    useEffect(() => {
        async function getApi() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/brands');
            if (data) {
                setAPIData(data?.models?.data)
            }
        }
        getApi()
    }, []);
    return (

        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Nome</label>
                    <input placeholder='Nome' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Descrição</label>
                    <textarea placeholder='Descrição' onChange={(e) => setDescription(e.target.value)}></textarea>
                </Form.Field>
                <Form.Field>
                    <label>Tensão</label>
                    <select placeholder='Tensão' name="voltage" onChange={(e) => setVoltage(e.target.value)}>
                        <option value="0" id="voltage">Selecione</option>
                        <option value="220v" id="voltage">220v</option>
                        <option value="110v" id="voltage">110v</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Marca</label>
                    <select placeholder='Marca' name="brand_id" onChange={(e) => setBrand(e.target.value)}>
                        <option value="0" id="voltage">Selecione</option>
                        {
                            APIData.map((data) =>
                                <option value={data.id}> {data.name} </option>
                            )}

                    </select>
                </Form.Field>
                <Button onClick={postData} type='submit'>Criar</Button>
                <Link to='/'><Button >Voltar</Button></Link>
            </Form>
        </div>
    )
}
