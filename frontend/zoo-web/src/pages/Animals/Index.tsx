import { Fab, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as animalAPI from "../../api/animalAPI";
import { type Animal } from "../../models/Animal";
import { Add, ArrowBack, LocalHospital } from "@mui/icons-material";

export default function AnimalsPage() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function loadAnimals() {
        try {
            const resposta = await animalAPI.getAnimals();
            setAnimals(resposta .data);
        } catch {
            alert("Infelizmente não foi possivel carregar os dados dos animais");
        } finally {
            setLoading(false);
        }
    }

    async function remove(id: number) {
        if (!confirm("Deseja apagar os dados?")) return;
        try {
            await animalAPI.deleteAnimal(id);
            loadAnimals();
        } catch {
            alert("Erro - Não foi possivel realizar a exclusão");
        }
    }

    useEffect(() => {
        loadAnimals();
    }, []);

    if (loading) return <h3>Carregando...</h3>;

    return (
        <div style={{ position: 'relative', padding: 20 }}>
           
            <h1 style={{ textAlign: 'center', marginBottom: 40 }}>Tabela de Animais</h1>

            <TableContainer component={Paper} style={{ marginTop: 20, padding: 10 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Espécie</TableCell>
                            <TableCell>Habitat</TableCell>
                            <TableCell>País de Origem</TableCell>
                            <TableCell>Update</TableCell> 
                            <TableCell>Remover</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animals.map(animal => (
                            <TableRow key={animal.animalId}>
                                <TableCell>{animal.animalId}</TableCell>
                                <TableCell>{animal.name}</TableCell>
                                <TableCell>{animal.species}</TableCell>
                                <TableCell>{animal.habitat}</TableCell>
                                <TableCell>{animal.countryOrigin}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate(`/animal/update/${animal.animalId}`)}
                                        style={{ marginRight: 10 }}
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                                 <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => remove(animal.animalId)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Tooltip title="Cadastrar Animal">
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => navigate("/animal/create")}
                    style={{ position: "fixed", bottom: 20, right: 33 }}
                >
                    <Add />
                </Fab>
            </Tooltip>

           
            <Tooltip title="Cuidados do Animais">
                <Fab
                    color="primary"
                    aria-label="cuidados"
                    onClick={() => navigate("/cuidados")}
                    style={{ position: "fixed", bottom: 20, right: 120 }}
                >
                    <LocalHospital />
                </Fab>
            </Tooltip>

            
            <Tooltip title="Página Inicial">
                <Fab
                    color="primary"
                    aria-label="voltar"
                    onClick={() => navigate("/")}
                    style={{ position: "fixed", top: 20, left: 20 }}
                >
                    <ArrowBack />
                </Fab>
            </Tooltip>
        </div>
    );
}