import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function Create() {

    let history = useHistory();
    const [name, setName] = useState('');

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/api/brands`, {
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
                    <input placeholder='Nome' onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Button onClick={postData} type='submit'>Criar</Button>
                <Link to='/marcas'><Button >Voltar</Button></Link>
            </Form>
        </div>
    )
}
