import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ReadBrand() {
    const [APIData, setAPIData] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function getApi() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/brands');
            if (data) {
                setAPIData(data?.models?.data)
            }
        }
        getApi()
    }, [refresh]);

    const setData = (data) => {
        let { id, name } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Nome', name);

    }

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/api/brands`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/brands/${id}`).then(() => setRefresh(id)).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }


    return (
        <div class="col-lg-12">
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>

                        <Table.HeaderCell>Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>


                                <Table.Cell>
                                    <Link to='/editar/marcas'>
                                        <Button onClick={() => setData(data)}>Atualizar</Button></Link>
                                    <Button onClick={() => onDelete(data.id)}>Apagar</Button>
                                </Table.Cell>


                            </Table.Row>
                        )
                    })}
                </Table.Body>

            </Table>
            <Link to='/criar/marcas'>
                <Button >Criar Marcas</Button>
            </Link>
            <Link to='/'>
                <Button >Produtos</Button>
            </Link>
        </div>
    )
}
