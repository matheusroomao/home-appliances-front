import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function Update() {
    const [APIData, setAPIData] = useState([]);

    let history = useHistory();
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [voltage, setVoltage] = useState('');
    const [brand_id, setBrand] = useState('');


    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('Nome'));
        setDescription(localStorage.getItem('Descrição'));
        setVoltage(localStorage.getItem('Tensão'));
        setBrand(localStorage.getItem('Marca'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://127.0.0.1:8000/api/products/${id}`, {
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
                    <input placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Descrição</label>
                    <input placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                <label>Tensão</label>
                    <select placeholder='Tensão'name="voltage" value={voltage} onChange={(e) => setVoltage(e.target.value)}>
                        <option value="0" id="voltage">Selecione</option>
                        <option value="220v" id="voltage">220v</option>
                        <option value="110v" id="voltage">110v</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Marca</label>
                    <select placeholder='Marca' name="brand_id" value={brand_id}  onChange={(e) => setBrand(e.target.value)}>
                        <option value="0" id="voltage">Selecione</option>
                        {
                            APIData.map((data) =>
                                <option value={data.id}> {data.name} </option>
                            )}

                    </select>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Salvar</Button>
                <Link to='/'><Button >Voltar</Button></Link>
            </Form>
        </div>
    )
}
