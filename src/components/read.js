import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Read = () => {
    const [APIData, setAPIData] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function getApi() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products');
            if (data) {
                setAPIData(data?.models?.data)
            }
        }
        getApi()
    }, [refresh]);

    const setData = (data) => {
        let { id, name, description, voltage, brand_id } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Nome', name);
        localStorage.setItem('Descrição', description);
        localStorage.setItem('Tensão', voltage)
        localStorage.setItem('Marca', brand_id)

    }

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/api/products`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/products/${id}`).then(() => setRefresh(id))
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Descrição</Table.HeaderCell>
                        <Table.HeaderCell>Tensão</Table.HeaderCell>
                        <Table.HeaderCell>Marca</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Ações</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData && APIData?.map((data) =>
                    (
                        <Table.Row>
                            <Table.Cell>{data.name}</Table.Cell>
                            <Table.Cell>{data.description}</Table.Cell>
                            <Table.Cell>{data.voltage}</Table.Cell>
                           <Table.Cell>{data.brand.name}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Link to='/update'>
                                <Table.Cell>
                                    <Button onClick={() => setData(data)}>Atualizar</Button>
                                </Table.Cell>
                            </Link>
                            <Table.Cell>
                                <Button onClick={() => onDelete(data.id)}>Apagar</Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                    )}
                </Table.Body>

            </Table>
            <Link to='/create'>
                <Button >Criar Produtos</Button>
            </Link>
            <Link to='/marcas'>
                <Button >Marcas</Button>
            </Link>
        </div>
    )
}

export default Read;
