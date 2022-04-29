import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function UpdateBrand() {
    let history = useHistory();
    const [id, setID] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('Nome'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://127.0.0.1:8000/api/brands/${id}`, {
            name
        }).then(() => {
            history.push('/marcas')
        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Nome</label>
                    <input placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Salvar</Button>
                <Link to='/marcas'><Button >Voltar</Button></Link>

            </Form>
        </div>
    )
}
