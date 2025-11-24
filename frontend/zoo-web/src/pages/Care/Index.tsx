import { Fab, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Care } from "../../models/Care";
import * as careAPI from "../../api/careAPI";
import { Add, ArrowBack, Pets } from "@mui/icons-material";

export default function CarePage() {
    const [cares, setCares] = useState<Care[]>([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    async function loadCare() {
        try {
            const resposta = await careAPI.getCare();
            setCares(resposta.data);
        } catch {
            alert("Infelizmente não foi possivel carregar os cuidados dos animais");
        } finally {
            setLoading(false);
        }
    }

    async function remove(id: number) {
        if (!confirm("Deseja apagar os dados? ")) return;
        try {
            await careAPI.deleteCare(id);
            loadCare();
        } catch {
            alert("Erro - Não foi possivel realizar a exclusão");
        }
    }

    useEffect(() => {
        loadCare();
    }, []);

    if (loading) return <h3>Carregando...</h3>;

    return (
        <div style={{ position: 'relative', padding: 20 }}>
            <h1 style={{ textAlign: 'center', marginBottom: 40 }}>Tabela de Cuidados</h1>

            <TableContainer component={Paper} style={{ marginTop: 20, padding: 10 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Frequência</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cares.map(care => (
                            <TableRow key={care.careId}>
                                <TableCell>{care.careId}</TableCell>
                                <TableCell>{care.name}</TableCell>
                                <TableCell>{care.description}</TableCell>
                                <TableCell>{care.frequency}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => nav(`/cuidado/update/${care.careId}`)}
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => remove(care.careId)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

           
            <Tooltip title="Cadastrar Cuidado">
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => nav("/cuidado/create")}
                    style={{ position: "fixed", bottom: 20, right: 33 }}
                >
                    <Add />
                </Fab>
            </Tooltip>

            <Tooltip title="Área de Animais">
                <Fab
                    color="primary"
                    aria-label="animais"
                    onClick={() => nav("/animals")}
                    style={{ position: "fixed", bottom: 20, right: 120 }}
                >
                    <Pets />
                </Fab>
            </Tooltip>

            <Tooltip title="Página Inicial">
                <Fab
                    color="primary"
                    aria-label="voltar"
                    onClick={() => nav("/")}
                    style={{ position: "fixed", top: 20, left: 20 }}
                >
                    <ArrowBack />
                </Fab>
            </Tooltip>
        </div>
    );
}
